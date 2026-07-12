"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getLocalized } from "@/lib/types";
import type { JobOpening } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

export function PositionsList({ jobOpenings }: { jobOpenings: JobOpening[] }) {
  const t = useTranslations("careers");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const [active, setActive] = React.useState<string | "all">("all");

  const departments = React.useMemo(
    () => Array.from(new Set(jobOpenings.map((job) => job.department))),
    [jobOpenings],
  );
  const filtered = active === "all" ? jobOpenings : jobOpenings.filter((j) => j.department === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={cn(
            "rounded-sm border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
            active === "all" ? "border-navy-900 bg-navy-900 text-white" : "border-border bg-card text-muted-foreground hover:border-gold-500/50",
          )}
        >
          {tCommon("all")}
        </button>
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setActive(dept)}
            className={cn(
              "rounded-sm border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
              active === dept ? "border-navy-900 bg-navy-900 text-white" : "border-border bg-card text-muted-foreground hover:border-gold-500/50",
            )}
          >
            {dept}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-sm border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {t("noOpenings")}
        </p>
      ) : (
        <div className="mt-8 divide-y divide-border rounded-sm border border-border bg-card">
          {filtered.map((job) => (
            <div key={job.slug} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">{job.department}</span>
                <h3 className="mt-1.5 text-base font-bold text-foreground">{getLocalized(job.title, locale)}</h3>
                <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">{getLocalized(job.summary, locale)}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" /> {getLocalized(job.location, locale)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="size-3.5" /> {getLocalized(job.type, locale)}
                  </span>
                </div>
              </div>
              <a
                href="#apply"
                className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700"
              >
                {t("applyNow")} <ArrowRight className="size-4" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
