"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, ImageField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import type { Partner } from "@/lib/types";

type ActionState = { error?: string };
type PartnerAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

export function PartnerForm({ partner, action }: { partner?: Partner; action: PartnerAction }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <section className="rounded-sm border border-border bg-card p-6">
        <Field label="Ad" htmlFor="name">
          <Input id="name" name="name" defaultValue={partner?.name} required className="mt-2 rounded-sm" />
        </Field>
        <div className="mt-5">
          <ImageField name="logo" label="Loqo (könüllü)" defaultValue={partner?.logo} required={false} />
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
