import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteJobOpening } from "@/app/admin/actions/careers";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AdminCareersPage() {
  const jobs = await prisma.jobOpening.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Vakansiyalar" description={`${jobs.length} vakansiya`} newHref="/admin/careers/new" newLabel="Yeni vakansiya" />

      <div className="overflow-x-auto rounded-sm border border-border bg-card">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Vəzifə</th>
              <th className="px-5 py-3 font-semibold">Departament</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {jobs.map((job) => {
              const title = (job.title as { en?: string })?.en ?? job.slug;
              return (
                <tr key={job.id}>
                  <td className="px-5 py-3.5 font-medium text-foreground">
                    {title}
                    <p className="mt-0.5 text-xs text-muted-foreground">/{job.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{job.department}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "rounded-sm px-2 py-1 text-xs font-semibold",
                        job.isOpen ? "bg-green-500/10 text-green-700 dark:text-green-400" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {job.isOpen ? "Açıq" : "Bağlı"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/careers/${job.id}`}
                        className="flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <DeleteButton action={deleteJobOpening.bind(null, job.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Hələ vakansiya yoxdur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
