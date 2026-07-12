"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ProjectCard } from "@/components/project-card";
import { sectors } from "@/lib/repo/projects";
import type { Sector, Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const sectorLabels: Record<Sector, string> = {
  commercial: "Commercial",
  industrial: "Industrial",
  residential: "Residential",
  infrastructure: "Infrastructure",
  healthcare: "Healthcare",
  hospitality: "Hospitality",
  government: "Government",
  education: "Education",
};

export function ProjectsFilterGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");
  const [active, setActive] = React.useState<Sector | "all">("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.sector === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={cn(
            "rounded-sm border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
            active === "all"
              ? "border-navy-900 bg-navy-900 text-white"
              : "border-border bg-card text-muted-foreground hover:border-gold-500/50 hover:text-foreground",
          )}
        >
          {t("filterAll")}
        </button>
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setActive(sector)}
            className={cn(
              "rounded-sm border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
              active === sector
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-border bg-card text-muted-foreground hover:border-gold-500/50 hover:text-foreground",
            )}
          >
            {sectorLabels[sector]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-sm text-muted-foreground">{tCommon("noResults")}</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
