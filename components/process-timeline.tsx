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
      <div className="hide-scrollbar flex gap-6 overflow-x-auto pb-6 lg:grid lg:grid-cols-7 lg:gap-4 lg:overflow-visible">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.key} delay={index * 0.06} className="w-[220px] shrink-0 lg:w-auto">
              <div className="relative flex h-full flex-col rounded-sm border border-border bg-card p-6">
                <span className="text-xs font-bold text-gold-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mt-4 flex size-11 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-foreground">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {t(`${step.key}.body`)}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="mt-3 hidden h-px w-full bg-gradient-to-r from-gold-500/60 to-transparent lg:block" />
              )}
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
