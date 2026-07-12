"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getLocalized, type NewsArticle } from "@/lib/types";
import { Reveal } from "@/components/motion/reveal";
import { formatDate } from "@/lib/format-date";

const categoryLabels: Record<NewsArticle["category"], string> = {
  company: "Company",
  projects: "Projects",
  industry: "Industry",
  sustainability: "Sustainability",
  awards: "Awards",
};

export function NewsCard({ article, index = 0 }: { article: NewsArticle; index?: number }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <Link
        href={`/news/${article.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-sm bg-gold-500 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy-900">
            {categoryLabels[article.category]}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>{formatDate(article.publishedAt, locale)}</span>
            <span>·</span>
            <span>{article.readingMinutes} {t("min")}</span>
          </div>
          <h3 className="mt-3 text-lg font-bold leading-snug text-foreground line-clamp-2">
            {getLocalized(article.title, locale)}
          </h3>
          <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {getLocalized(article.excerpt, locale)}
          </p>
          <span className="mt-5 text-sm font-semibold text-gold-600">{t("readMore")}</span>
        </div>
      </Link>
    </Reveal>
  );
}
