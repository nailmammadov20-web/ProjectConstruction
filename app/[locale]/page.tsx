import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { AboutTeaser } from "@/components/home/about-teaser";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { ServicesTeaser } from "@/components/home/services-teaser";
import { ProjectsTeaser } from "@/components/home/projects-teaser";
import { StatsBand } from "@/components/home/stats-band";
import { ProcessSection } from "@/components/home/process-section";
import { QualityTeaser } from "@/components/home/quality-teaser";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PartnersSection } from "@/components/home/partners-section";
import { NewsTeaser } from "@/components/home/news-teaser";
import { CtaBand } from "@/components/cta-band";
import { getServices } from "@/lib/repo/services";
import { getProjects, getFeaturedProjects } from "@/lib/repo/projects";
import { getNewsArticles } from "@/lib/repo/news";
import { getCertificates } from "@/lib/repo/team";
import { getSiteSettings } from "@/lib/repo/settings";
import { getLocalized, type Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSiteSettings();

  return {
    title: getLocalized(settings.heroTitle, locale as Locale),
    description: getLocalized(settings.heroSubtitle, locale as Locale),
    alternates: { canonical: `/${locale}` },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  const [services, projects, newsArticles, certificates, settings] = await Promise.all([
    getServices(),
    getProjects(),
    getNewsArticles(),
    getCertificates(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero settings={settings} />
      <AboutTeaser />
      <WhyChooseUs />
      <ServicesTeaser services={services} />
      <ProjectsTeaser projects={getFeaturedProjects(projects)} />
      <StatsBand settings={settings} />
      <ProcessSection />
      <QualityTeaser certificates={certificates} />
      <TestimonialsSection />
      <PartnersSection />
      <NewsTeaser articles={newsArticles} />
      <CtaBand
        title={t("ctaTitle")}
        body={t("ctaBody")}
        buttonLabel={t("ctaButton")}
      />
    </>
  );
}
