import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { createProject } from "@/app/admin/actions/projects";
import { getProjects } from "@/lib/repo/projects";
import { getLocalized } from "@/lib/types";

export default async function NewProjectPage() {
  const projects = await getProjects();
  const relatedOptions = projects.map((p) => ({ slug: p.slug, title: getLocalized(p.title, "en") }));

  return (
    <div>
      <AdminPageHeader title="Yeni layihə" description="Yeni layihə əlavə edin" />
      <ProjectForm action={createProject} relatedOptions={relatedOptions} />
    </div>
  );
}
