"use client";

import { useTranslations } from "next-intl";
import { StatCounter } from "@/components/stat-counter";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { SiteSettings } from "@/lib/types";

export function StatsBand({ settings }: { settings: SiteSettings }) {
  const tStats = useTranslations("hero.stats");

  const stats = [
    { key: "experience", value: settings.statExperience, suffix: "+" },
    { key: "projects", value: settings.statProjects, suffix: "+" },
    { key: "countries", value: settings.statCountries, suffix: "+" },
    { key: "engineers", value: settings.statEngineers, suffix: "+" },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,white,transparent_45%)]" />
      </div>
      <div className="container-wide">
        <RevealGroup className="grid grid-cols-2 gap-10 lg:grid-cols-4" stagger={0.12}>
          {stats.map((stat) => (
            <RevealItem key={stat.key} className="text-center lg:border-l lg:border-white/10 lg:first:border-l-0">
              <div className="text-4xl font-bold text-gold-400 sm:text-5xl">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-white/55 sm:text-sm">
                {tStats(stat.key)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
