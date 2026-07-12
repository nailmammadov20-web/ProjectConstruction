"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/section-title";
import { NewsCard } from "@/components/news-card";
import { Reveal } from "@/components/motion/reveal";
import type { NewsArticle } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export function NewsTeaser({ articles }: { articles: NewsArticle[] }) {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const latest = articles.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionTitle eyebrow={t("newsEyebrow")} title={t("newsTitle")} />
          <Reveal delay={0.1}>
            <Button render={<Link href="/news" />} nativeButton={false} variant="outline" className="shrink-0 rounded-sm">
              {tCommon("viewAll")} <ArrowRight className="ml-1 size-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((article, index) => (
            <NewsCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
