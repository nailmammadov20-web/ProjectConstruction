import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/types";
import { getLocalized } from "@/lib/types";
import { PageHero } from "@/components/page-hero";
import { ApplicationForm } from "@/components/careers/application-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { formatDate } from "@/lib/format-date";
import { placeholderImage } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { getJobOpenings, getJobOpeningBySlug } from "@/lib/repo/careers";
import { routing } from "@/i18n/routing";
import { MapPin, Briefcase, Building2, GraduationCap, CalendarClock } from "lucide-react";

export async function generateStaticParams() {
  const jobOpenings = await getJobOpenings();
  return routing.locales.flatMap((locale) =>
    jobOpenings.map((job) => ({ locale, slug: job.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const job = await getJobOpeningBySlug(slug);
  if (!job) return {};
  const title = getLocalized(job.title, locale as Locale);

  return {
    title,
    description: getLocalized(job.summary, locale as Locale),
    alternates: { canonical: `/${locale}/careers/${slug}` },
  };
}

export default async function JobOpeningDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const job = await getJobOpeningBySlug(slug);
  if (!job) notFound();

  const t = await getTranslations({ locale, namespace: "careers" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const jobOpenings = await getJobOpenings();
  const title = getLocalized(job.title, locale);
  const heroImage = placeholderImage(`careers-${job.slug}`, 1920, 1080, title);
  const pageUrl = `${siteConfig.url}/${locale}/careers/${slug}`;

  const keyFacts = [
    { icon: Building2, label: t("department"), value: job.department },
    { icon: MapPin, label: tCommon("location"), value: getLocalized(job.location, locale) },
    { icon: Briefcase, label: t("type"), value: getLocalized(job.type, locale) },
    ...(job.experienceLevel
      ? [{ icon: GraduationCap, label: t("experienceLevel"), value: getLocalized(job.experienceLevel, locale) }]
      : []),
    ...(job.applicationDeadline
      ? [{ icon: CalendarClock, label: t("deadline"), value: formatDate(job.applicationDeadline, locale) }]
      : []),
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tCommon("home"), url: siteConfig.url },
          { name: tNav("careers"), url: `${siteConfig.url}/${locale}/careers` },
          { name: title, url: pageUrl },
        ]}
      />

      <PageHero
        eyebrow={t("detailEyebrow")}
        title={title}
        body={getLocalized(job.summary, locale)}
        image={heroImage}
        breadcrumbs={[{ label: tNav("careers"), href: "/careers" }, { label: title }]}
      />

      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 gap-14 lg:grid-cols-[1fr_320px]">
          <div>
            {job.responsibilities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-foreground">{t("responsibilities")}</h2>
                <ul className="mt-5 space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <Reveal key={index} delay={index * 0.05}>
                      <li className="flex items-start gap-3 text-base leading-relaxed text-foreground/85">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
                        {getLocalized(item, locale)}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements.length > 0 && (
              <div className="mt-14">
                <h2 className="text-xl font-bold text-foreground">{t("requirements")}</h2>
                <ul className="mt-5 space-y-3">
                  {job.requirements.map((item, index) => (
                    <Reveal key={index} delay={index * 0.05}>
                      <li className="flex items-start gap-3 text-base leading-relaxed text-foreground/85">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
                        {getLocalized(item, locale)}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-sm border border-border bg-muted/40 p-7 lg:sticky lg:top-28">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("keyFacts")}
            </h3>
            <dl className="mt-5 space-y-5">
              {keyFacts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-3">
                  <fact.icon className="mt-0.5 size-4 shrink-0 text-gold-600" />
                  <div>
                    <dt className="text-xs text-muted-foreground">{fact.label}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-foreground">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <a
              href="#apply"
              className="mt-7 inline-flex h-10 w-full items-center justify-center rounded-sm bg-gold-500 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
            >
              {t("applyNow")}
            </a>
          </aside>
        </div>
      </section>

      <section id="apply" className="section-padding bg-muted/40 scroll-mt-24">
        <div className="container-narrow">
          <ApplicationForm jobOpenings={jobOpenings} presetPosition={job.slug} />
        </div>
      </section>
    </>
  );
}
