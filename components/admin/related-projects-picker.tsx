"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export function RelatedProjectsPicker({
  name,
  label,
  options,
  defaultValue,
  hint,
}: {
  name: string;
  label: string;
  options: { slug: string; title: string }[];
  defaultValue: string[];
  hint?: string;
}) {
  const [selected, setSelected] = React.useState<string[]>(defaultValue);
  const [query, setQuery] = React.useState("");

  function toggle(slug: string) {
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  const filtered = options.filter((o) => o.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-2 rounded-sm border border-border">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <Search className="size-3.5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Layihə axtar..."
            className="flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-52 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-2 py-4 text-center text-xs text-muted-foreground">Nəticə tapılmadı.</p>
          )}
          {filtered.map((option) => (
            <label
              key={option.slug}
              className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.slug)}
                onChange={() => toggle(option.slug)}
                className="size-4 accent-gold-500"
              />
              {option.title}
            </label>
          ))}
        </div>
      </div>
      <input type="hidden" name={name} value={selected.join(",")} />
    </div>
  );
}
