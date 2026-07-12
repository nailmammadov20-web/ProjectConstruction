"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import type { Office } from "@/lib/types";

type ActionState = { error?: string };
type OfficeAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

export function OfficeForm({ office, action }: { office?: Office; action: OfficeAction }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <section className="rounded-sm border border-border bg-card p-6">
        <div className="space-y-5">
          <LocalizedTextField name="city" label="Şəhər" defaultValue={office?.city} />
          <LocalizedTextField name="country" label="Ölkə" defaultValue={office?.country} />
          <LocalizedTextField name="address" label="Ünvan" defaultValue={office?.address} multiline />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Telefon" htmlFor="phone">
            <Input id="phone" name="phone" defaultValue={office?.phone} required className="mt-2 rounded-sm" />
          </Field>
          <Field label="E-poçt" htmlFor="email">
            <Input id="email" name="email" type="email" defaultValue={office?.email} required className="mt-2 rounded-sm" />
          </Field>
        </div>
        <div className="mt-5">
          <Field label="Google Maps embed URL" htmlFor="mapEmbedUrl" hint="məs: https://www.google.com/maps?q=Baku,Azerbaijan&output=embed">
            <Input id="mapEmbedUrl" name="mapEmbedUrl" defaultValue={office?.mapEmbedUrl} required className="mt-2 rounded-sm" />
          </Field>
        </div>
        <label className="mt-5 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="isHeadquarters" defaultChecked={office?.isHeadquarters} className="size-4 accent-gold-500" />
          Baş ofis (HQ)
        </label>
      </section>

      <SubmitButton />
    </form>
  );
}
