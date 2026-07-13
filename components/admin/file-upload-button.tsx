"use client";

import * as React from "react";
import { uploadMedia } from "@/app/admin/actions/upload";
import { Loader2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export function FileUploadButton({
  accept,
  onUploaded,
  label = "Yüklə",
  className,
}: {
  accept: string;
  onUploaded: (url: string) => void;
  label?: string;
  className?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPending(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadMedia(formData);
    setPending(false);
    e.target.value = "";
    if ("error" in result) {
      setError(result.error);
    } else {
      onUploaded(result.url);
    }
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={pending}
        className={cn(
          "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm border border-border bg-card px-2.5 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-60 cursor-pointer",
          className,
        )}
      >
        {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
        {pending ? "Yüklənir..." : label}
      </button>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
