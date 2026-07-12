"use client";

import { StatCounter } from "@/components/stat-counter";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { SiteSettings } from "@/lib/types";

export function SafetyStats({ settings }: { settings: SiteSettings }) {
  const safetyStats = [
    { value: settings.safetyLtifr, suffix: "", decimals: 2, label: "LTIFR per 200,000 hours" },
    { value: settings.safetyManHours, suffix: "M+", decimals: 1, label: "Safe man-hours logged" },
    { value: settings.safetyAuditedPct, suffix: "%", decimals: 0, label: "Sites ISO 45001 audited" },
    { value: settings.safetyFatalities, suffix: "", decimals: 0, label: "Fatalities, group-wide, 5-year record" },
  ];

  return (
    <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4" stagger={0.1}>
      {safetyStats.map((stat) => (
        <RevealItem key={stat.label} className="text-center lg:border-l lg:border-white/10 lg:first:border-l-0">
          <div className="text-4xl font-bold text-gold-400 sm:text-5xl">
            <StatCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
          </div>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-white/55 sm:text-sm">
            {stat.label}
          </p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
