import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/types";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { ValuesGrid } from "@/components/about/values-grid";
import { Timeline } from "@/components/timeline";
import { CeoMessage } from "@/components/about/ceo-message";
import { AchievementsList } from "@/components/about/achievements-list";
import { LeadershipGrid } from "@/components/about/leadership-grid";
import { CtaBand } from "@/components/cta-band";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { placeholderImage } from "@/lib/images";
import { companyTimeline } from "@/lib/data/stats";
import { siteConfig } from "@/lib/site-config";
import { getLeadershipTeam } from "@/lib/repo/team";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const heroImage = placeholderImage("about-hero", 1920, 1080, "Constructivegroup.az engineering team on-site reviewing plans");
  const team = await getLeadershipTeam();

  const timelineEntries = companyTimeline.map((entry) => ({
    year: entry.year,
    title: entry.title,
    body: entry.body,
  }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tCommon("home"), url: siteConfig.url },
          { name: tNav("about"), url: `${siteConfig.url}/${locale}/about` },
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("intro")}
        image={heroImage}
        breadcrumbs={[{ label: tNav("about") }]}
      />

      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="rounded-sm border border-border bg-card p-8 sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
              {t("missionTitle")}
            </span>
            <p className="mt-4 text-lg leading-relaxed text-foreground">{t("mission")}</p>
          </div>
          <div className="rounded-sm border border-border bg-navy-900 p-8 sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {t("visionTitle")}
            </span>
            <p className="mt-4 text-lg leading-relaxed text-white/85">{t("vision")}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <SectionTitle eyebrow={t("valuesTitle")} title={t("valuesTitle")} align="center" className="mx-auto" />
          <div className="mt-14">
            <ValuesGrid />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <SectionTitle eyebrow={t("timelineEyebrow")} title={t("timelineTitle")} />
          <div className="mt-14">
            <Timeline entries={timelineEntries} />
          </div>
        </div>
      </section>

      <CeoMessage locale={locale} />

      <section className="section-padding">
        <div className="container-wide">
          <SectionTitle eyebrow={t("eyebrow")} title={t("achievementsTitle")} />
          <div className="mt-14">
            <AchievementsList />
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <SectionTitle eyebrow={t("leadershipEyebrow")} title={t("leadershipTitle")} align="center" className="mx-auto" />
          <div className="mt-14">
            <LeadershipGrid team={team} />
          </div>
        </div>
      </section>

      <CtaBand title={tHome("ctaTitle")} body={tHome("ctaBody")} buttonLabel={tHome("ctaButton")} />
    </>
  );
}
