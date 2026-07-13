"use client";

import * as React from "react";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField } from "@/components/admin/form-fields";
import { LocalizedListRepeater } from "@/components/admin/localized-list-repeater";
import { SubmitButton } from "@/components/admin/submit-button";
import { cn } from "@/lib/utils";
import type { LocalizedText, Locale } from "@/lib/types";

type ActionState = { error?: string };
type JobAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

export type JobOpeningFormValues = {
  slug: string;
  title: LocalizedText;
  department: string;
  location: LocalizedText;
  type: LocalizedText;
  summary: LocalizedText;
  responsibilities: LocalizedText[];
  requirements: LocalizedText[];
  experienceLevel?: LocalizedText;
  applicationDeadline?: string;
  isOpen: boolean;
};

const localeLabels: Record<Locale, string> = { en: "English", az: "Azərbaycan", ru: "Русский" };

export function CareerForm({ job, action }: { job?: JobOpeningFormValues; action: JobAction }) {
  const [state, formAction] = useActionState(action, {});
  const [activeLocale, setActiveLocale] = React.useState<Locale>("en");

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <div className="ml-auto flex w-fit items-center justify-end gap-1 rounded-sm border border-border bg-card p-1">
        {(["en", "az", "ru"] as Locale[]).map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => setActiveLocale(loc)}
            className={cn(
              "rounded-sm px-2.5 py-1.5 text-xs font-bold tracking-wide transition-colors cursor-pointer",
              activeLocale === loc ? "bg-gold-500 text-navy-900" : "text-muted-foreground hover:text-foreground",
            )}
            title={localeLabels[loc]}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Əsas məlumat</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Slug (URL)" htmlFor="slug">
            <Input id="slug" name="slug" defaultValue={job?.slug} required className="mt-2 rounded-sm" />
          </Field>
          <Field label="Departament" htmlFor="department">
            <Input id="department" name="department" defaultValue={job?.department} required className="mt-2 rounded-sm" />
          </Field>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5">
          <LocalizedTextField name="title" label="Vəzifə adı" defaultValue={job?.title} activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
          <LocalizedTextField name="location" label="Yer" defaultValue={job?.location} activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
          <LocalizedTextField name="type" label="Növ" defaultValue={job?.type} hint='məs: "Full-time"' activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
          <LocalizedTextField name="summary" label="Qısa təsvir" defaultValue={job?.summary} multiline activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <LocalizedTextField
            name="experienceLevel"
            label="Təcrübə tələbi (könüllü)"
            defaultValue={job?.experienceLevel}
            required={false}
            hint='məs: "3-5 il"'
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <Field label="Son müraciət tarixi (könüllü)" htmlFor="applicationDeadline">
            <Input
              id="applicationDeadline"
              name="applicationDeadline"
              type="date"
              defaultValue={job?.applicationDeadline?.slice(0, 10)}
              className="mt-2 rounded-sm"
            />
          </Field>
        </div>
        <label className="mt-5 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="isOpen" defaultChecked={job?.isOpen ?? true} className="size-4 accent-gold-500" />
          Vakansiya açıqdır (saytda göstər)
        </label>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Vəzifə təfərrüatları</h2>
        <div className="mt-5 space-y-5">
          <LocalizedListRepeater
            name="responsibilities_json"
            label="Vəzifə öhdəlikləri"
            defaultValue={job?.responsibilities ?? []}
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
            addLabel="Öhdəlik əlavə et"
            emptyLabel="Hələ öhdəlik əlavə edilməyib."
          />
          <div className="border-t border-border pt-5">
            <LocalizedListRepeater
              name="requirements_json"
              label="Tələblər"
              defaultValue={job?.requirements ?? []}
              activeLocale={activeLocale}
              onActiveLocaleChange={setActiveLocale}
              addLabel="Tələb əlavə et"
              emptyLabel="Hələ tələb əlavə edilməyib."
            />
          </div>
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
