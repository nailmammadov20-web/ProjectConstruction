"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export function TagInput({
  name,
  label,
  defaultValue,
  hint,
  placeholder = "Yazın və Enter basın...",
}: {
  name: string;
  label: string;
  defaultValue: string[];
  hint?: string;
  placeholder?: string;
}) {
  const [tags, setTags] = React.useState<string[]>(defaultValue);
  const [input, setInput] = React.useState("");

  function addTag(raw: string) {
    const value = raw.trim();
    if (!value) return;
    setTags((prev) => (prev.includes(value) ? prev : [...prev, value]));
    setInput("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  }

  return (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-2 flex flex-wrap items-center gap-1.5 rounded-sm border border-input bg-transparent px-2 py-1.5 focus-within:ring-2 focus-within:ring-ring/50">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-sm bg-muted px-2 py-1 text-xs font-medium text-foreground"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="cursor-pointer text-muted-foreground hover:text-destructive"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={tags.length ? "" : placeholder}
          className="min-w-[140px] flex-1 border-0 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <input type="hidden" name={name} value={tags.join(",")} />
    </div>
  );
}
