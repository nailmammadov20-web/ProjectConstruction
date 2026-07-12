"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getLocalized } from "@/lib/types";
import type { TeamMember } from "@/lib/types";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function LeadershipGrid({ team }: { team: TeamMember[] }) {
  const locale = useLocale() as Locale;

  return (
    <RevealGroup className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6" stagger={0.06}>
      {team.map((member) => (
        <RevealItem key={member.slug}>
          <div className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
            <Image
              src={member.photo.src}
              alt={member.photo.alt}
              fill
              sizes="(min-width: 1024px) 16vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-3.5 pt-10">
              <p className="text-sm font-bold text-white">{member.name}</p>
              <p className="mt-0.5 text-[11px] text-white/70">{getLocalized(member.role, locale)}</p>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
