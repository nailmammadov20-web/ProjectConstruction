"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getLocalized } from "@/lib/types";
import type { Service, Project, NewsArticle } from "@/lib/types";

type Result = {
  href: string;
  title: string;
  kind: string;
};

export function SearchDialog({
  open,
  onOpenChange,
  services,
  projects,
  newsArticles,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  services: Service[];
  projects: Project[];
  newsArticles: NewsArticle[];
}) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const [query, setQuery] = React.useState("");

  const results: Result[] = React.useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.trim().toLowerCase();
    const items: Result[] = [
      ...services.map((s) => ({
        href: `/services/${s.slug}`,
        title: getLocalized(s.title, locale),
        kind: "Service",
      })),
      ...projects.map((p) => ({
        href: `/projects/${p.slug}`,
        title: getLocalized(p.title, locale),
        kind: "Project",
      })),
      ...newsArticles.map((n) => ({
        href: `/news/${n.slug}`,
        title: getLocalized(n.title, locale),
        kind: "News",
      })),
    ];
    return items.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 8);
  }, [query, locale, services, projects, newsArticles]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[20%] max-w-xl translate-y-0 gap-0 p-0 sm:rounded-sm">
        <DialogHeader className="border-b border-border px-5 py-4">
          <DialogTitle className="sr-only">{t("search")}</DialogTitle>
          <div className="flex items-center gap-3">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="border-0 px-0 shadow-none focus-visible:ring-0 text-base"
            />
          </div>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No results found.
            </p>
          )}
          {results.map((result) => (
            <Link
              key={result.href}
              href={result.href}
              onClick={() => onOpenChange(false)}
              className="flex items-center justify-between rounded-sm px-3 py-2.5 text-sm hover:bg-muted transition-colors"
            >
              <span className="font-medium text-foreground">{result.title}</span>
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                {result.kind}
              </span>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
