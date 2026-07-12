import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { updateProject } from "@/app/admin/actions/projects";
import type { Project, ImageAsset, LocalizedText, ProjectMilestone } from "@/lib/types";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.project.findUnique({ where: { id } });
  if (!row) notFound();

  const project: Project = {
    slug: row.slug,
    title: row.title as unknown as LocalizedText,
    sector: row.sector as Project["sector"],
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

  return (
    <div>
      <AdminPageHeader title="Layihəni redaktə et" description={row.slug} />
      <ProjectForm project={project} action={updateProject.bind(null, id)} />
    </div>
  );
}
