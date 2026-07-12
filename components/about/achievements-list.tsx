"use client";

import { achievements } from "@/lib/data/stats";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Trophy } from "lucide-react";

export function AchievementsList() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.08}>
      {achievements.map((item) => (
        <RevealItem key={item.title.en}>
          <div className="flex items-start gap-4 rounded-sm border border-border bg-card p-6">
            <Trophy className="mt-0.5 size-5 shrink-0 text-gold-500" />
            <div>
              <span className="text-xs font-bold text-gold-600">{item.year}</span>
              <p className="mt-1 text-sm font-medium leading-snug text-foreground">{item.title.en}</p>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
