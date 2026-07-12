"use client";

import { useTransition } from "react";
import { Check, Loader2 } from "lucide-react";

export function MarkReviewedButton({ action }: { action: () => Promise<void> }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => action())}
      disabled={pending}
      className="flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-green-500/40 hover:text-green-700 disabled:opacity-50 cursor-pointer dark:hover:text-green-400"
    >
      {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
      Baxıldı
    </button>
  );
}
