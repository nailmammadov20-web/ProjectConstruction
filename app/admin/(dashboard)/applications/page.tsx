import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { MarkReviewedButton } from "@/components/admin/mark-reviewed-button";
import { markApplicationReviewed, deleteApplication } from "@/app/admin/actions/inbox";
import { cn } from "@/lib/utils";

export default async function AdminApplicationsPage() {
  const applications = await prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader title="İş müraciətləri" description={`${applications.length} müraciət`} />

      <div className="space-y-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className={cn(
              "rounded-sm border p-6",
              application.status === "new" ? "border-gold-500/40 bg-gold-50/40 dark:bg-gold-500/5" : "border-border bg-card",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-foreground">{application.name}</p>
                <p className="text-xs text-muted-foreground">
                  {application.email} · {application.phone}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gold-600">{application.position}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {application.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                </span>
                {application.status === "new" && (
                  <MarkReviewedButton action={markApplicationReviewed.bind(null, application.id)} />
                )}
                <DeleteButton action={deleteApplication.bind(null, application.id)} confirmMessage="Bu müraciəti silmək istədiyinizə əminsiniz?" />
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">{application.message}</p>
            {application.resumeFileName && (
              <p className="mt-2 text-xs text-muted-foreground">CV faylı: {application.resumeFileName}</p>
            )}
          </div>
        ))}
        {applications.length === 0 && (
          <p className="rounded-sm border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Hələ müraciət yoxdur.
          </p>
        )}
      </div>
    </div>
  );
}
