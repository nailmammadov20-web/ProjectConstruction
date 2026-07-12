import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/types";
import { getLocalized } from "@/lib/types";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { Gallery } from "@/components/gallery";
import { ServiceCard } from "@/components/service-card";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { getIcon } from "@/lib/icon-map";
import { getServices, getServiceBySlug, getRelatedServices } from "@/lib/repo/services";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  const services = await getServices();
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  const title = getLocalized(service.title, locale as Locale);

  return {
    title,
    description: getLocalized(service.shortDescription, locale as Locale),
    alternates: { canonical: `/${locale}/services/${slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "services" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const Icon = getIcon(service.icon);
  const related = await getRelatedServices(service);
  const title = getLocalized(service.title, locale);
  const pageUrl = `${siteConfig.url}/${locale}/services/${slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tCommon("home"), url: siteConfig.url },
          { name: tNav("services"), url: `${siteConfig.url}/${locale}/services` },
          { name: title, url: pageUrl },
        ]}
      />
      <ServiceJsonLd name={title} description={getLocalized(service.shortDescription, locale)} url={pageUrl} />

      <PageHero
        eyebrow={t("detailEyebrow")}
        title={title}
        body={getLocalized(service.shortDescription, locale)}
        image={service.heroImage}
        breadcrumbs={[{ label: tNav("services"), href: "/services" }, { label: title }]}
      />

      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 gap-14 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex size-14 items-center justify-center rounded-sm bg-navy-900 text-gold-400">
              <Icon className="size-6" />
            </div>
            <div className="mt-8 space-y-5">
              {service.description.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.06}>
                  <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
                    {getLocalized(paragraph, locale)}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="mt-14">
              <h2 className="text-xl font-bold text-foreground">{t("benefitsTitle")}</h2>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.benefits.map((benefit, index) => (
                  <Reveal key={index} delay={index * 0.05}>
                    <li className="flex items-start gap-3 rounded-sm border border-border bg-card p-4 text-sm text-foreground/85">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-500" />
                      {getLocalized(benefit, locale)}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <h2 className="text-xl font-bold text-foreground">{t("processTitle")}</h2>
              <ol className="mt-6 space-y-4">
                {service.process.map((step, index) => (
                  <Reveal key={index} delay={index * 0.05}>
                    <li className="flex items-start gap-4">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gold-500/40 text-sm font-bold text-gold-600">
                        {index + 1}
                      </span>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/85 sm:text-base">
                        {getLocalized(step, locale)}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            {service.gallery.length > 0 && (
              <div className="mt-14">
                <h2 className="text-xl font-bold text-foreground">{tCommon("gallery")}</h2>
                <div className="mt-6">
                  <Gallery images={service.gallery} />
                </div>
              </div>
            )}

            {service.faq.length > 0 && (
              <div className="mt-14">
                <h2 className="text-xl font-bold text-foreground">{tCommon("faq")}</h2>
                <Accordion className="mt-4">
                  {service.faq.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-base font-semibold">
                        {getLocalized(item.question, locale)}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {getLocalized(item.answer, locale)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-sm border border-border bg-muted/40 p-7 lg:sticky lg:top-28">
            <h3 className="text-base font-bold text-foreground">{t("ctaTitle")}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{t("ctaBody")}</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-sm bg-gold-500 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
            >
              {tNav("contactUs")}
            </Link>

            {related.length > 0 && (
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("relatedTitle")}
                </p>
                <ul className="mt-4 space-y-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/services/${r.slug}`}
                        className="text-sm font-medium text-foreground hover:text-gold-600"
                      >
                        {getLocalized(r.title, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-muted/40">
          <div className="container-wide">
            <SectionTitle eyebrow={t("eyebrow")} title={t("relatedTitle")} />
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, index) => (
                <ServiceCard key={r.slug} service={r} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title={tHome("ctaTitle")} body={tHome("ctaBody")} buttonLabel={tHome("ctaButton")} />
    </>
  );
}
