"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { NewsCard } from "@/components/news-card";
import type { NewsCategory, NewsArticle } from "@/lib/types";
import { getLocalized } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const categoryLabels: Record<NewsCategory, string> = {
  company: "Company",
  projects: "Projects",
  industry: "Industry",
  sustainability: "Sustainability",
  awards: "Awards",
};

const categories = Object.keys(categoryLabels) as NewsCategory[];
const PAGE_SIZE = 6;

export function NewsList({ articles }: { articles: NewsArticle[] }) {
  const t = useTranslations("news");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<NewsCategory | "all">("all");
  const [page, setPage] = React.useState(1);

  const sorted = React.useMemo(
    () => [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)),
    [articles],
  );

  const filtered = React.useMemo(() => {
    return sorted.filter((article) => {
      const matchesCategory = category === "all" || article.category === category;
      const matchesQuery =
        query.trim().length === 0 ||
        getLocalized(article.title, locale).toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [sorted, category, query, locale]);

  const filterKey = `${category}|${query}`;
  const [lastFilterKey, setLastFilterKey] = React.useState(filterKey);
  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={cn(
              "rounded-sm border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer",
              category === "all"
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-border bg-card text-muted-foreground hover:border-gold-500/50",
            )}
          >
            {tCommon("all")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-sm border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer",
                category === cat
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-border bg-card text-muted-foreground hover:border-gold-500/50",
              )}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="rounded-sm pl-9"
          />
        </div>
      </div>

      {pageItems.length === 0 ? (
        <p className="mt-14 text-center text-sm text-muted-foreground">{tCommon("noResults")}</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((article, index) => (
            <NewsCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-gold-500/50 hover:text-foreground disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={cn(
                "flex size-9 items-center justify-center rounded-sm border text-sm font-medium transition-colors cursor-pointer",
                page === index + 1
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-border text-muted-foreground hover:border-gold-500/50 hover:text-foreground",
              )}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-gold-500/50 hover:text-foreground disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
