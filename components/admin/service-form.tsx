"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField, JsonField, ImageField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { iconMap } from "@/lib/icon-map";
import type { Service } from "@/lib/types";

type ActionState = { error?: string };
type ServiceAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

export function ServiceForm({ service, action }: { service?: Service; action: ServiceAction }) {
  const [state, formAction] = useActionState(action, {});
  const iconNames = Object.keys(iconMap);

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Əsas məlumat</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Slug (URL)" htmlFor="slug" hint="məs: construction">
            <Input id="slug" name="slug" defaultValue={service?.slug} required className="mt-2 rounded-sm" />
          </Field>
          <Field label="İkon" htmlFor="icon">
            <select
              id="icon"
              name="icon"
              defaultValue={service?.icon ?? "HardHat"}
              className="mt-2 h-9 w-full rounded-sm border border-input bg-transparent px-3 text-sm"
            >
              {iconNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5">
          <LocalizedTextField name="title" label="Başlıq" defaultValue={service?.title} />
          <LocalizedTextField name="shortDescription" label="Qısa təsvir" defaultValue={service?.shortDescription} multiline />
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Əsas şəkil</h2>
        <div className="mt-5">
          <ImageField name="heroImage" label="Hero şəkli" defaultValue={service?.heroImage} />
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Ətraflı məzmun (JSON formatında)
        </h2>
        <div className="mt-5 space-y-5">
          <JsonField
            name="gallery_json"
            label="Qalereya"
            defaultValue={service?.gallery}
            hint='[{"src":"https://...","alt":"...","width":1200,"height":900}]'
          />
          <JsonField
            name="description_json"
            label="Təsvir (paraqraflar)"
            defaultValue={service?.description}
            hint='[{"en":"...","az":"...","ru":"..."}]'
          />
          <JsonField
            name="benefits_json"
            label="Üstünlüklər"
            defaultValue={service?.benefits}
            hint='[{"en":"...","az":"...","ru":"..."}]'
          />
          <JsonField
            name="process_json"
            label="Proses addımları"
            defaultValue={service?.process}
            hint='[{"en":"...","az":"...","ru":"..."}]'
          />
          <JsonField
            name="faq_json"
            label="FAQ"
            defaultValue={service?.faq}
            hint='[{"question":{"en":"..."},"answer":{"en":"..."}}]'
          />
          <Field label="Əlaqəli xidmətlər (slug)" htmlFor="relatedServiceSlugs" hint="vergüllə ayırın">
            <Input
              id="relatedServiceSlugs"
              name="relatedServiceSlugs"
              defaultValue={service?.relatedServiceSlugs?.join(", ")}
              className="mt-2 rounded-sm"
            />
          </Field>
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
