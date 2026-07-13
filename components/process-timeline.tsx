"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import {
  MessageSquare,
  ClipboardList,
  PenTool,
  HardHat,
  BadgeCheck,
  PackageCheck,
  LifeBuoy,
} from "lucide-react";

const steps = [
  { key: "consultation", icon: MessageSquare },
  { key: "planning", icon: ClipboardList },
  { key: "design", icon: PenTool },
  { key: "construction", icon: HardHat },
  { key: "qualityControl", icon: BadgeCheck },
  { key: "delivery", icon: PackageCheck },
  { key: "support", icon: LifeBuoy },
] as const;

export function ProcessTimeline() {
  const t = useTranslations("process");

  return (
    <div className="relative">
      {/* Connecting line through the icon centers — spans from the first icon's
          center to the last (icons are centered within 7 equal columns, so an
          inset of half a column's share of the width lands exactly on them). */}
      <div className="pointer-events-none absolute top-[52px] inset-x-[7.15%] z-0 hidden h-px bg-gradient-to-r from-gold-500/70 via-gold-500/30 to-gold-500/70 lg:block" />

      <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-7 lg:gap-4 lg:overflow-visible">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.key} delay={index * 0.07} className="w-[200px] shrink-0 lg:w-auto">
              <div className="group relative z-10 flex h-full flex-col items-center rounded-sm border border-border bg-card px-5 pb-6 pt-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-xl">
                <div className="relative flex size-12 items-center justify-center rounded-full bg-navy-900 text-gold-400 shadow-[0_0_0_5px_var(--card)] transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-900">
                  <Icon className="size-5" />
                </div>
                <span className="mt-3.5 text-[11px] font-bold tracking-[0.15em] text-gold-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1.5 text-sm font-bold text-foreground">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {t(`${step.key}.body`)}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
