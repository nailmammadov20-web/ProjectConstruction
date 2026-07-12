"use client";

import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/section-title";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import {
  BadgeCheck,
  Lightbulb,
  ShieldCheck,
  CalendarClock,
  Compass,
  PackageCheck,
} from "lucide-react";

const items = [
  { key: "quality", icon: BadgeCheck },
  { key: "innovation", icon: Lightbulb },
  { key: "safety", icon: ShieldCheck },
  { key: "planning", icon: CalendarClock },
  { key: "engineering", icon: Compass },
  { key: "delivery", icon: PackageCheck },
] as const;

export function WhyChooseUs() {
  const t = useTranslations("home");
  const tWhy = useTranslations("why");

  return (
    <section className="section-padding bg-muted/40">
      <div className="container-wide">
        <SectionTitle eyebrow={t("whyEyebrow")} title={t("whyTitle")} body={t("whyBody")} />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, icon: Icon }) => (
            <RevealItem key={key}>
              <div className="group h-full rounded-sm border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex size-12 items-center justify-center rounded-full border border-gold-500/30 text-gold-600 transition-colors group-hover:bg-navy-900 group-hover:text-gold-400">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-foreground">{tWhy(`${key}.title`)}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {tWhy(`${key}.body`)}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
