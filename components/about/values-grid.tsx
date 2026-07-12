"use client";

import { useTranslations } from "next-intl";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { HeartHandshake, Award, ShieldCheck, Users } from "lucide-react";

const values = [
  { key: "integrity", icon: HeartHandshake },
  { key: "excellence", icon: Award },
  { key: "safety", icon: ShieldCheck },
  { key: "collaboration", icon: Users },
] as const;

export function ValuesGrid() {
  const t = useTranslations("about.valueItems");

  return (
    <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
      {values.map(({ key, icon: Icon }) => (
        <RevealItem key={key}>
          <div className="h-full rounded-sm border border-border bg-card p-7">
            <div className="flex size-11 items-center justify-center rounded-full bg-navy-900 text-gold-400">
              <Icon className="size-5" />
            </div>
            <h3 className="mt-5 text-base font-bold text-foreground">{t(`${key}.title`)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${key}.body`)}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
