import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { getLocalized, type NewsArticle } from "@/lib/types";
import { formatDate } from "@/lib/format-date";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRight } from "lucide-react";

export async function FeaturedArticle({ article, locale }: { article: NewsArticle; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "news" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <Reveal>
      <Link
        href={`/news/${article.slug}`}
        className="group grid grid-cols-1 overflow-hidden rounded-sm border border-border bg-card lg:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted lg:aspect-auto">
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <span className="w-fit rounded-sm bg-gold-500 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy-900">
            {t("featured")}
          </span>
          <h2 className="mt-5 text-2xl font-bold leading-tight text-foreground text-balance sm:text-3xl">
            {getLocalized(article.title, locale)}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {getLocalized(article.excerpt, locale)}
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formatDate(article.publishedAt, locale)}</span>
            <span>·</span>
            <span>{article.readingMinutes} {tCommon("min")}</span>
          </div>
          <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
            {tCommon("readMore")} <ArrowRight className="size-4" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
