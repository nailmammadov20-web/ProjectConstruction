import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/types";
import { getLocalized } from "@/lib/types";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { NewsCard } from "@/components/news-card";
import { SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/seo/json-ld";
import { getNewsArticles, getArticleBySlug, getRelatedArticles } from "@/lib/repo/news";
import { formatDate } from "@/lib/format-date";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { Calendar, Clock, User } from "lucide-react";

export async function generateStaticParams() {
  const newsArticles = await getNewsArticles();
  return routing.locales.flatMap((locale) =>
    newsArticles.map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  const title = getLocalized(article.title, locale as Locale);

  return {
    title,
    description: getLocalized(article.excerpt, locale as Locale),
    alternates: { canonical: `/${locale}/news/${slug}` },
    openGraph: { type: "article", publishedTime: article.publishedAt, images: [article.coverImage.src] },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const allArticles = await getNewsArticles();
  const related = getRelatedArticles(allArticles, article);
  const title = getLocalized(article.title, locale);
  const pageUrl = `${siteConfig.url}/${locale}/news/${slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tCommon("home"), url: siteConfig.url },
          { name: tNav("news"), url: `${siteConfig.url}/${locale}/news` },
          { name: title, url: pageUrl },
        ]}
      />
      <ArticleJsonLd
        headline={title}
        description={getLocalized(article.excerpt, locale)}
        image={article.coverImage.src}
        datePublished={article.publishedAt}
        authorName={article.author}
        url={pageUrl}
      />

      <article className="pt-32 sm:pt-36">
        <div className="container-narrow">
          <Breadcrumbs items={[{ label: tNav("news"), href: "/news" }, { label: title }]} />
          <h1 className="mt-6 text-3xl font-bold leading-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="size-4" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" /> {formatDate(article.publishedAt, locale)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {article.readingMinutes} {tCommon("min")}
            </span>
          </div>
        </div>

        <div className="container-wide mt-10">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm">
            <Image src={article.coverImage.src} alt={article.coverImage.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>

        <div className="container-narrow mt-12 space-y-6">
          {article.body.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p className="text-base leading-[1.85] text-foreground/85 sm:text-lg">
                {getLocalized(paragraph, locale)}
              </p>
            </Reveal>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-padding mt-8">
          <div className="container-wide">
            <SectionTitle eyebrow={tCommon("relatedNews")} title={tCommon("relatedNews")} />
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, index) => (
                <NewsCard key={r.slug} article={r} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
