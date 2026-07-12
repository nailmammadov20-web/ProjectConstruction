import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { MarkReviewedButton } from "@/components/admin/mark-reviewed-button";
import { markMessageReviewed, deleteMessage } from "@/app/admin/actions/inbox";
import { cn } from "@/lib/utils";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader title="Əlaqə mesajları" description={`${messages.length} mesaj`} />

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "rounded-sm border p-6",
              message.status === "new" ? "border-gold-500/40 bg-gold-50/40 dark:bg-gold-500/5" : "border-border bg-card",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-foreground">{message.name}</p>
                <p className="text-xs text-muted-foreground">
                  {message.email} {message.phone && `· ${message.phone}`} {message.company && `· ${message.company}`}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gold-600">{message.department}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {message.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                </span>
                {message.status === "new" && <MarkReviewedButton action={markMessageReviewed.bind(null, message.id)} />}
                <DeleteButton action={deleteMessage.bind(null, message.id)} confirmMessage="Bu mesajı silmək istədiyinizə əminsiniz?" />
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">{message.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="rounded-sm border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Hələ mesaj yoxdur.
          </p>
        )}
      </div>
    </div>
  );
}
