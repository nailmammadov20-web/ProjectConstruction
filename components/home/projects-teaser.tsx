"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/section-title";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function ProjectsTeaser({ projects }: { projects: Project[] }) {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const featured = projects.slice(0, 4);

  return (
    <section className="section-padding bg-navy-900">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow={t("projectsEyebrow")}
            title={t("projectsTitle")}
            body={t("projectsBody")}
            theme="dark"
          />
          <Reveal delay={0.1}>
            <Button
              render={<Link href="/projects" />}
              nativeButton={false}
              variant="outline"
              className="shrink-0 rounded-sm border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              {tNav("viewAllProjects")} <ArrowRight className="ml-1 size-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project, index) => (
            // Only the first 2 show on mobile — see ServicesTeaser for the same trim.
            <div key={project.slug} className={cn(index >= 2 && "hidden sm:block")}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
