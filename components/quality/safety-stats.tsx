"use client";

import { StatCounter } from "@/components/stat-counter";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { safetyStats } from "@/lib/data/stats";

export function SafetyStats() {
  return (
    <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4" stagger={0.1}>
      {safetyStats.map((stat) => (
        <RevealItem key={stat.label.en} className="text-center lg:border-l lg:border-white/10 lg:first:border-l-0">
          <div className="text-4xl font-bold text-gold-400 sm:text-5xl">
            <StatCounter value={stat.value} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 2 : 0} />
          </div>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-white/55 sm:text-sm">
            {stat.label.en}
          </p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
