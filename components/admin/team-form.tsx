"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField, ImageField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import type { TeamMember } from "@/lib/types";

type ActionState = { error?: string };
type MemberAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

export function TeamForm({ member, action }: { member?: TeamMember; action: MemberAction }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <section className="rounded-sm border border-border bg-card p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Slug (URL)" htmlFor="slug">
            <Input id="slug" name="slug" defaultValue={member?.slug} required className="mt-2 rounded-sm" />
          </Field>
          <Field label="Ad Soyad" htmlFor="name">
            <Input id="name" name="name" defaultValue={member?.name} required className="mt-2 rounded-sm" />
          </Field>
        </div>
        <div className="mt-5 space-y-5">
          <LocalizedTextField name="role" label="Vəzifə" defaultValue={member?.role} />
          <LocalizedTextField name="bio" label="Bio (könüllü)" defaultValue={member?.bio} multiline required={false} />
        </div>
        <div className="mt-5">
          <ImageField name="photo" label="Foto" defaultValue={member?.photo} />
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
