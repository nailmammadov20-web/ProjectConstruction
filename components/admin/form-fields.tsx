"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LocalizedTabInput } from "@/components/admin/localized-tab-input";
import { ImageIcon } from "lucide-react";
import type { LocalizedText, Locale } from "@/lib/types";

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </Label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/**
 * Localized (EN/AZ/RU) text field with a language-tab switcher instead of
 * three always-visible stacked inputs. Posts as `${name}_en/_az/_ru` via
 * hidden inputs, so server actions using readLocalized() need no changes.
 * Pass `activeLocale`/`onActiveLocaleChange` to sync the visible language
 * across multiple fields (e.g. a page-level language switcher); otherwise
 * each field manages its own tab independently.
 */
export function LocalizedTextField({
  name,
  label,
  defaultValue,
  multiline = false,
  required = true,
  hint,
  activeLocale: controlledLocale,
  onActiveLocaleChange,
}: {
  name: string;
  label: string;
  defaultValue?: LocalizedText;
  multiline?: boolean;
  required?: boolean;
  hint?: string;
  activeLocale?: Locale;
  onActiveLocaleChange?: (locale: Locale) => void;
}) {
  const [value, setValue] = React.useState<LocalizedText>(defaultValue ?? { en: "" });
  const [localLocale, setLocalLocale] = React.useState<Locale>("en");
  const activeLocale = controlledLocale ?? localLocale;
  const setActiveLocale = onActiveLocaleChange ?? setLocalLocale;

  return (
    <div>
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-gold-600">*</span>}
      </Label>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-2">
        <LocalizedTabInput
          value={value}
          onChange={setValue}
          activeLocale={activeLocale}
          onActiveLocaleChange={setActiveLocale}
          multiline={multiline}
        />
      </div>
      <input type="hidden" name={`${name}_en`} value={value.en} />
      <input type="hidden" name={`${name}_az`} value={value.az ?? ""} />
      <input type="hidden" name={`${name}_ru`} value={value.ru ?? ""} />
    </div>
  );
}

/** Textarea for JSON-shaped fields (arrays of LocalizedText, images, milestones, etc.) */
export function JsonField({
  name,
  label,
  defaultValue,
  hint,
  rows = 6,
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: unknown;
  hint?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <Field label={label} htmlFor={name} hint={hint}>
      <Textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue ? JSON.stringify(defaultValue, null, 2) : ""}
        className="mt-2 rounded-sm font-mono text-xs"
      />
    </Field>
  );
}

export function ImageField({
  name,
  label,
  defaultValue,
  required = true,
}: {
  name: string;
  label: string;
  defaultValue?: { src: string; alt: string; width: number; height: number };
  required?: boolean;
}) {
  const [preview, setPreview] = React.useState(defaultValue?.src ?? "");
  const [errored, setErrored] = React.useState(false);

  return (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="mt-2 flex gap-4">
        <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-border bg-muted">
          {preview && !errored ? (
            // Admin-supplied URLs can be any host, so a plain <img> avoids
            // next/image's remotePatterns allow-list for this preview only.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt=""
              className="size-full object-cover"
              onError={() => setErrored(true)}
              onLoad={() => setErrored(false)}
            />
          ) : (
            <ImageIcon className="size-6 text-muted-foreground/50" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input
            name={`${name}_src`}
            placeholder="Şəkil URL (https://...)"
            defaultValue={defaultValue?.src ?? ""}
            onChange={(e) => setPreview(e.target.value)}
            required={required}
            className="rounded-sm"
          />
          <Input
            name={`${name}_alt`}
            placeholder="Alt mətn (təsvir)"
            defaultValue={defaultValue?.alt ?? ""}
            required={required}
            className="rounded-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              name={`${name}_width`}
              type="number"
              placeholder="En (px)"
              defaultValue={defaultValue?.width ?? 1600}
              className="rounded-sm"
            />
            <Input
              name={`${name}_height`}
              type="number"
              placeholder="Hündürlük (px)"
              defaultValue={defaultValue?.height ?? 1000}
              className="rounded-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
