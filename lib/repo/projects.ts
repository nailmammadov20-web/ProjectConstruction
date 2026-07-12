import { cache } from "react";
import { prisma } from "@/lib/db";
import type {
  Project,
  ProjectMilestone,
  ImageAsset,
  LocalizedText,
  Sector,
} from "@/lib/types";
import type { Project as PrismaProject } from "@prisma/client";

export const sectors: Sector[] = [
  "commercial",
  "industrial",
  "residential",
  "infrastructure",
  "healthcare",
  "hospitality",
  "government",
  "education",
];

function toProject(row: PrismaProject): Project {
  return {
    slug: row.slug,
    title: row.title as unknown as LocalizedText,
    sector: row.sector as Sector,
    location: row.location as unknown as LocalizedText,
    client: row.client as unknown as LocalizedText,
    area: row.area,
    completionDate: row.completionDate,
    scope: row.scope as unknown as LocalizedText,
    summary: row.summary as unknown as LocalizedText,
    heroImage: row.heroImage as unknown as ImageAsset,
    gallery: row.gallery as unknown as ImageAsset[],
    beforeImage: (row.beforeImage as unknown as ImageAsset | null) ?? undefined,
    afterImage: (row.afterImage as unknown as ImageAsset | null) ?? undefined,
    overview: row.overview as unknown as LocalizedText[],
    challenges: row.challenges as unknown as LocalizedText[],
    solutions: row.solutions as unknown as LocalizedText[],
    technologies: row.technologies,
    timeline: row.timeline as unknown as ProjectMilestone[],
    featured: row.featured,
    relatedProjectSlugs: row.relatedProjectSlugs,
  };
}

export const getProjects = cache(async (): Promise<Project[]> => {
  const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return rows.map(toProject);
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | undefined> => {
  const row = await prisma.project.findUnique({ where: { slug } });
  return row ? toProject(row) : undefined;
});

export async function getRelatedProjects(project: Project): Promise<Project[]> {
  if (project.relatedProjectSlugs.length === 0) return [];
  const rows = await prisma.project.findMany({
    where: { slug: { in: project.relatedProjectSlugs } },
  });
  return rows.map(toProject);
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter((project) => project.featured);
}
