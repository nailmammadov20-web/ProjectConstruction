"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { LocalizedText, Locale } from "@/lib/types";

const locales: Locale[] = ["en", "az", "ru"];
const localeFlags: Record<Locale, string> = { en: "EN", az: "AZ", ru: "RU" };

export function LocalizedTabInput({
  value,
  onChange,
  activeLocale,
  onActiveLocaleChange,
  multiline = false,
  placeholder,
  rows = 3,
}: {
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
  activeLocale: Locale;
  onActiveLocaleChange: (locale: Locale) => void;
  multiline?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  const Control = multiline ? Textarea : Input;

  return (
    <div>
      <div className="mb-1.5 flex gap-1">
        {locales.map((loc) => {
          const filled = Boolean(value[loc]?.trim());
          const active = activeLocale === loc;
          return (
            <button
              key={loc}
              type="button"
              onClick={() => onActiveLocaleChange(loc)}
              className={cn(
                "flex items-center gap-1 rounded-sm border px-2 py-1 text-[11px] font-bold tracking-wide transition-colors cursor-pointer",
                active
                  ? "border-gold-500 bg-gold-50 text-gold-700 dark:bg-gold-500/10 dark:text-gold-300"
                  : "border-border text-muted-foreground hover:border-gold-500/40 hover:text-foreground",
              )}
            >
              {localeFlags[loc]}
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  filled ? "bg-green-500" : "bg-border",
                )}
              />
            </button>
          );
        })}
      </div>
      <Control
        value={value[activeLocale] ?? ""}
        onChange={(e) => onChange({ ...value, [activeLocale]: e.target.value })}
        placeholder={placeholder}
        rows={multiline ? rows : undefined}
        className="rounded-sm"
      />
    </div>
  );
}
