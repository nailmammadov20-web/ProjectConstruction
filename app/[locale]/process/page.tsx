import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/types";
import { PageHero } from "@/components/page-hero";
import { ProcessTimeline } from "@/components/process-timeline";
import { CtaBand } from "@/components/cta-band";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { placeholderImage } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("processTitle"),
    alternates: { canonical: `/${locale}/process` },
  };
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const heroImage = placeholderImage("process-hero", 1920, 1080, "Project planning session with construction drawings");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tCommon("home"), url: siteConfig.url },
          { name: tNav("process"), url: `${siteConfig.url}/${locale}/process` },
        ]}
      />
      <PageHero
        eyebrow={t("processEyebrow")}
        title={t("processTitle")}
        image={heroImage}
        breadcrumbs={[{ label: tNav("process") }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          <ProcessTimeline />
        </div>
      </section>

      <CtaBand title={t("ctaTitle")} body={t("ctaBody")} buttonLabel={t("ctaButton")} />
    </>
  );
}
