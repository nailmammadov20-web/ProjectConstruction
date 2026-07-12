import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/types";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { CtaBand } from "@/components/cta-band";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { placeholderImage } from "@/lib/images";
import { getServices } from "@/lib/repo/services";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/services` },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const heroImage = placeholderImage("services-hero", 1920, 1080, "Engineers reviewing structural drawings on-site");
  const services = await getServices();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tCommon("home"), url: siteConfig.url },
          { name: tNav("services"), url: `${siteConfig.url}/${locale}/services` },
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("intro")}
        image={heroImage}
        breadcrumbs={[{ label: tNav("services") }]}
      />

      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </section>

      <CtaBand title={tHome("ctaTitle")} body={tHome("ctaBody")} buttonLabel={tHome("ctaButton")} />
    </>
  );
}
