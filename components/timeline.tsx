"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getLocalized, type LocalizedText } from "@/lib/types";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type TimelineEntry = {
  year: string;
  title: LocalizedText;
  body: LocalizedText;
};

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const locale = useLocale() as Locale;
  const [active, setActive] = React.useState(0);

  if (entries.length === 0) return null;
  const current = entries[Math.min(active, entries.length - 1)];

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
      <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {entries.map((entry, index) => (
          <button
            key={entry.year}
            onClick={() => setActive(index)}
            className={cn(
              "shrink-0 rounded-sm px-4 py-2.5 text-left text-sm font-semibold transition-colors lg:px-0 lg:py-3 lg:border-l-2 lg:pl-4 cursor-pointer",
              active === index
                ? "bg-navy-900 text-gold-400 lg:bg-transparent lg:border-gold-500 lg:text-foreground"
                : "bg-muted text-muted-foreground lg:bg-transparent lg:border-border lg:hover:border-gold-500/50",
            )}
          >
            {entry.year}
          </button>
        ))}
      </div>

      <Reveal key={active} className="rounded-sm border border-border bg-card p-8 sm:p-10">
        <span className="text-sm font-semibold uppercase tracking-widest text-gold-600">
          {current.year}
        </span>
        <h3 className="mt-3 text-2xl font-bold text-foreground">
          {getLocalized(current.title, locale)}
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {getLocalized(current.body, locale)}
        </p>
      </Reveal>
    </div>
  );
}
