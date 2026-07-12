import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AdminPageHeader({
  title,
  description,
  newHref,
  newLabel,
}: {
  title: string;
  description?: string;
  newHref?: string;
  newLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {newHref && (
        <Button render={<Link href={newHref} />} nativeButton={false} className="rounded-sm bg-navy-900 text-white hover:bg-navy-800">
          <Plus className="size-4" /> {newLabel ?? "Yeni əlavə et"}
        </Button>
      )}
    </div>
  );
}
