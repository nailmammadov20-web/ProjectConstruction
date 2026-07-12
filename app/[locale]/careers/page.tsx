import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/types";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { PositionsList } from "@/components/careers/positions-list";
import { ApplicationForm } from "@/components/careers/application-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { placeholderImage } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getJobOpenings } from "@/lib/repo/careers";
import { GraduationCap, HeartPulse, Plane, TrendingUp, Users, Coffee } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/careers` },
  };
}

const benefits = [
  { icon: HeartPulse, title: "Health & Life Insurance", body: "Comprehensive coverage for you and your family from day one." },
  { icon: GraduationCap, title: "Professional Development", body: "Certification sponsorship and a structured graduate programme." },
  { icon: TrendingUp, title: "Performance Bonuses", body: "Transparent, project-linked bonus structure across all levels." },
  { icon: Plane, title: "International Mobility", body: "Opportunities to work across our 18-country project portfolio." },
  { icon: Users, title: "Mentorship", body: "Paired mentorship from senior engineers and project leaders." },
  { icon: Coffee, title: "Modern Offices", body: "Purpose-built offices and site facilities across all locations." },
];

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "careers" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const heroImage = placeholderImage("careers-hero", 1920, 1080, "Diverse team of engineers collaborating on-site");
  const jobOpenings = await getJobOpenings();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tCommon("home"), url: siteConfig.url },
          { name: tNav("careers"), url: `${siteConfig.url}/${locale}/careers` },
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("intro")}
        image={heroImage}
        breadcrumbs={[{ label: tNav("careers") }]}
      />

      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <SectionTitle eyebrow={t("cultureTitle")} title={t("benefitsTitle")} align="center" className="mx-auto" />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {benefits.map((benefit) => (
              <RevealItem key={benefit.title}>
                <div className="h-full rounded-sm border border-border bg-card p-7">
                  <benefit.icon className="size-7 text-gold-500" />
                  <h3 className="mt-5 text-base font-bold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <SectionTitle eyebrow={t("departments")} title={t("openPositions")} />
          <div className="mt-14">
            <PositionsList jobOpenings={jobOpenings} />
          </div>
        </div>
      </section>

      <section id="apply" className="section-padding bg-muted/40 scroll-mt-24">
        <div className="container-narrow">
          <ApplicationForm jobOpenings={jobOpenings} />
        </div>
      </section>
    </>
  );
}
