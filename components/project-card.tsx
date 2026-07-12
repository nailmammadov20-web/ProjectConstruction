"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getLocalized, type Project } from "@/lib/types";
import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRight } from "lucide-react";

const sectorLabels: Record<Project["sector"], string> = {
  commercial: "Commercial",
  industrial: "Industrial",
  residential: "Residential",
  infrastructure: "Infrastructure",
  healthcare: "Healthcare",
  hospitality: "Hospitality",
  government: "Government",
  education: "Education",
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-sm bg-navy-900/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold-400 backdrop-blur-sm">
            {sectorLabels[project.sector]}
          </span>
          <span className="absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-full bg-gold-500 text-navy-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-bold text-foreground">{getLocalized(project.title, locale)}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{getLocalized(project.location, locale)}</p>
          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground/90">
            {getLocalized(project.summary, locale)}
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
            <span className="font-medium text-muted-foreground">{project.area}</span>
            <span className="font-semibold text-gold-600">{t("viewProject")}</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
