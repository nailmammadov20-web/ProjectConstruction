"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import type { LocalizedText } from "@/lib/types";

type ActionState = { error?: string };
type JobAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

export type JobOpeningFormValues = {
  slug: string;
  title: LocalizedText;
  department: string;
  location: LocalizedText;
  type: LocalizedText;
  summary: LocalizedText;
  isOpen: boolean;
};

export function CareerForm({ job, action }: { job?: JobOpeningFormValues; action: JobAction }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <section className="rounded-sm border border-border bg-card p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Slug (URL)" htmlFor="slug">
            <Input id="slug" name="slug" defaultValue={job?.slug} required className="mt-2 rounded-sm" />
          </Field>
          <Field label="Departament" htmlFor="department">
            <Input id="department" name="department" defaultValue={job?.department} required className="mt-2 rounded-sm" />
          </Field>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5">
          <LocalizedTextField name="title" label="Vəzifə adı" defaultValue={job?.title} />
          <LocalizedTextField name="location" label="Yer" defaultValue={job?.location} />
          <LocalizedTextField name="type" label="Növ" defaultValue={job?.type} hint='məs: "Full-time"' />
          <LocalizedTextField name="summary" label="Qısa təsvir" defaultValue={job?.summary} multiline />
        </div>
        <label className="mt-5 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="isOpen" defaultChecked={job?.isOpen ?? true} className="size-4 accent-gold-500" />
          Vakansiya açıqdır (saytda göstər)
        </label>
      </section>

      <SubmitButton />
    </form>
  );
}
