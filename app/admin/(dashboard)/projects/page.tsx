import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteProject } from "@/app/admin/actions/projects";
import { Pencil, Star } from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Layihələr" description={`${projects.length} layihə`} newHref="/admin/projects/new" newLabel="Yeni layihə" />

      <div className="overflow-x-auto rounded-sm border border-border bg-card">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Başlıq</th>
              <th className="px-5 py-3 font-semibold">Sektor</th>
              <th className="px-5 py-3 font-semibold">Tamamlanma</th>
              <th className="px-5 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((project) => {
              const title = (project.title as { en?: string })?.en ?? project.slug;
              return (
                <tr key={project.id}>
                  <td className="px-5 py-3.5 font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      {project.featured && <Star className="size-3.5 fill-gold-500 text-gold-500" />}
                      {title}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">/{project.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{project.sector}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{project.completionDate}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <DeleteButton action={deleteProject.bind(null, project.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Hələ layihə yoxdur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
