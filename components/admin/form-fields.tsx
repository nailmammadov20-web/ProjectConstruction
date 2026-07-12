import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { LocalizedText } from "@/lib/types";

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

/** Three stacked inputs (EN / AZ / RU) that post as `${name}_en`, `${name}_az`, `${name}_ru`. */
export function LocalizedTextField({
  name,
  label,
  defaultValue,
  multiline = false,
  required = true,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: LocalizedText;
  multiline?: boolean;
  required?: boolean;
  hint?: string;
}) {
  const Control = multiline ? Textarea : Input;
  return (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-2 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-9 shrink-0 text-xs font-semibold text-muted-foreground">EN</span>
          <Control
            name={`${name}_en`}
            defaultValue={defaultValue?.en ?? ""}
            required={required}
            rows={multiline ? 3 : undefined}
            className="rounded-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-9 shrink-0 text-xs font-semibold text-muted-foreground">AZ</span>
          <Control
            name={`${name}_az`}
            defaultValue={defaultValue?.az ?? ""}
            rows={multiline ? 3 : undefined}
            className="rounded-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-9 shrink-0 text-xs font-semibold text-muted-foreground">RU</span>
          <Control
            name={`${name}_ru`}
            defaultValue={defaultValue?.ru ?? ""}
            rows={multiline ? 3 : undefined}
            className="rounded-sm"
          />
        </div>
      </div>
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
  return (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Input
          name={`${name}_src`}
          placeholder="Şəkil URL (https://...)"
          defaultValue={defaultValue?.src ?? ""}
          required={required}
          className="rounded-sm sm:col-span-2"
        />
        <Input
          name={`${name}_alt`}
          placeholder="Alt mətn (təsvir)"
          defaultValue={defaultValue?.alt ?? ""}
          required={required}
          className="rounded-sm sm:col-span-2"
        />
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
  );
}
