import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/types";
import { PageHero } from "@/components/page-hero";
import { NewsList } from "@/components/news/news-list";
import { FeaturedArticle } from "@/components/news/featured-article";
import { CtaBand } from "@/components/cta-band";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { placeholderImage } from "@/lib/images";
import { getNewsArticles, getFeaturedArticle } from "@/lib/repo/news";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/news` },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "news" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const heroImage = placeholderImage("news-hero", 1920, 1080, "Company press briefing at a construction site");
  const articles = await getNewsArticles();
  const featured = getFeaturedArticle(articles);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tCommon("home"), url: siteConfig.url },
          { name: tNav("news"), url: `${siteConfig.url}/${locale}/news` },
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("intro")}
        image={heroImage}
        breadcrumbs={[{ label: tNav("news") }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          {featured && <FeaturedArticle article={featured} locale={locale} />}
          <div className="mt-16">
            <NewsList articles={articles} />
          </div>
        </div>
      </section>

      <CtaBand title={tHome("ctaTitle")} body={tHome("ctaBody")} buttonLabel={tHome("ctaButton")} />
    </>
  );
}
