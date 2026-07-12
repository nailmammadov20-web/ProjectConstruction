"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField, ImageField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import type { Testimonial } from "@/lib/types";

type ActionState = { error?: string };
type TestimonialAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

export function TestimonialForm({ testimonial, action }: { testimonial?: Testimonial; action: TestimonialAction }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <section className="rounded-sm border border-border bg-card p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Müəllif" htmlFor="author">
            <Input id="author" name="author" defaultValue={testimonial?.author} required className="mt-2 rounded-sm" />
          </Field>
          <Field label="Şirkət" htmlFor="company">
            <Input id="company" name="company" defaultValue={testimonial?.company} required className="mt-2 rounded-sm" />
          </Field>
        </div>
        <div className="mt-5 space-y-5">
          <LocalizedTextField name="role" label="Vəzifə" defaultValue={testimonial?.role} />
          <LocalizedTextField name="quote" label="Rəy mətni" defaultValue={testimonial?.quote} multiline />
          <ImageField name="photo" label="Foto (könüllü)" defaultValue={testimonial?.photo} required={false} />
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
