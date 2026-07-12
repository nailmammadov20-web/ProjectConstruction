"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import type { Certificate } from "@/lib/types";

type ActionState = { error?: string };
type CertAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

export function CertificateForm({ certificate, action }: { certificate?: Certificate; action: CertAction }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <section className="rounded-sm border border-border bg-card p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field label="Kod" htmlFor="code" hint="məs: ISO9001">
            <Input id="code" name="code" defaultValue={certificate?.code} required className="mt-2 rounded-sm" />
          </Field>
          <Field label="Verən qurum" htmlFor="issuer">
            <Input id="issuer" name="issuer" defaultValue={certificate?.issuer} required className="mt-2 rounded-sm" />
          </Field>
          <Field label="İl" htmlFor="year">
            <Input id="year" name="year" defaultValue={certificate?.year} required className="mt-2 rounded-sm" />
          </Field>
        </div>
        <div className="mt-5">
          <LocalizedTextField name="title" label="Başlıq" defaultValue={certificate?.title} />
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
