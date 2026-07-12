import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/types";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { CertificatesGrid } from "@/components/quality/certificates-grid";
import { SafetyStats } from "@/components/quality/safety-stats";
import { CtaBand } from "@/components/cta-band";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { placeholderImage } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { getCertificates } from "@/lib/repo/team";
import { getSiteSettings } from "@/lib/repo/settings";
import { getLocalized } from "@/lib/types";
import { ShieldCheck, Leaf, BadgeCheck } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quality" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/quality-safety` },
  };
}

export default async function QualitySafetyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "quality" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const heroImage = placeholderImage("quality-hero", 1920, 1080, "Safety inspector reviewing checklist on an active site");
  const certificates = await getCertificates();
  const settings = await getSiteSettings();

  const policies = [
    { icon: ShieldCheck, title: t("hseTitle"), body: getLocalized(settings.hseBody, locale) },
    { icon: BadgeCheck, title: t("qualityPolicyTitle"), body: getLocalized(settings.qualityPolicyBody, locale) },
    { icon: Leaf, title: t("environmentTitle"), body: getLocalized(settings.environmentBody, locale) },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tCommon("home"), url: siteConfig.url },
          { name: tNav("quality"), url: `${siteConfig.url}/${locale}/quality-safety` },
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("intro")}
        image={heroImage}
        breadcrumbs={[{ label: tNav("quality") }]}
      />

      <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-20">
        <div className="container-wide">
          <SafetyStats settings={settings} />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <SectionTitle eyebrow={t("eyebrow")} title={t("certificatesTitle")} />
          <div className="mt-14">
            <CertificatesGrid certificates={certificates} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/40">
        <div className="container-wide grid grid-cols-1 gap-6 lg:grid-cols-3">
          {policies.map((policy) => (
            <div key={policy.title} className="rounded-sm border border-border bg-card p-8">
              <policy.icon className="size-8 text-gold-500" />
              <h3 className="mt-5 text-lg font-bold text-foreground">{policy.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{policy.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title={tHome("ctaTitle")} body={tHome("ctaBody")} buttonLabel={tHome("ctaButton")} />
    </>
  );
}
