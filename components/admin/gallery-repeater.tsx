"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUploadButton } from "@/components/admin/file-upload-button";
import { Plus, Trash2, ChevronUp, ChevronDown, ImageIcon } from "lucide-react";
import type { ImageAsset } from "@/lib/types";

export function GalleryRepeater({
  name,
  label,
  defaultValue,
  hint,
}: {
  name: string;
  label: string;
  defaultValue: ImageAsset[];
  hint?: string;
}) {
  const [items, setItems] = React.useState<ImageAsset[]>(defaultValue.length ? defaultValue : []);

  function addItem() {
    setItems((prev) => [...prev, { src: "", alt: "", width: 1200, height: 900 }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function moveItem(index: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function updateItem(index: number, patch: Partial<ImageAsset>) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <Button
          type="button"
          onClick={addItem}
          className="h-8 gap-1.5 rounded-sm bg-navy-900 px-3 text-xs text-white hover:bg-navy-800"
        >
          <Plus className="size-3.5" /> Şəkil əlavə et
        </Button>
      </div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}

      <div className="mt-3 space-y-3">
        {items.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-sm border border-dashed border-border py-8 text-center">
            <ImageIcon className="size-6 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">Hələ şəkil əlavə edilməyib.</p>
          </div>
        )}
        {items.map((item, index) => (
          <div key={index} className="flex gap-3 rounded-sm border border-border bg-background p-4">
            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                className="flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted disabled:opacity-30 cursor-pointer"
              >
                <ChevronUp className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, 1)}
                disabled={index === items.length - 1}
                className="flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted disabled:opacity-30 cursor-pointer"
              >
                <ChevronDown className="size-3.5" />
              </button>
            </div>

            <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-border bg-muted">
              {item.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.src} alt="" className="size-full object-cover" />
              ) : (
                <ImageIcon className="size-5 text-muted-foreground/50" />
              )}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <Input
                  value={item.src}
                  onChange={(e) => updateItem(index, { src: e.target.value })}
                  placeholder="Şəkil URL (https://...) və ya yükləyin"
                  className="flex-1 rounded-sm"
                />
                <FileUploadButton
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onUploaded={(url) => updateItem(index, { src: url })}
                />
              </div>
              <Input
                value={item.alt}
                onChange={(e) => updateItem(index, { alt: e.target.value })}
                placeholder="Alt mətn (təsvir)"
                className="rounded-sm"
              />
            </div>

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="flex size-8 shrink-0 items-center justify-center self-start rounded-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <input type="hidden" name={name} value={JSON.stringify(items)} />
    </div>
  );
}
