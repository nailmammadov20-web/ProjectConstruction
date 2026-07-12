import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { createProject } from "@/app/admin/actions/projects";

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader title="Yeni layihə" description="Yeni layihə əlavə edin" />
      <ProjectForm action={createProject} />
    </div>
  );
}
