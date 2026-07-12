"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField, JsonField, ImageField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { sectors } from "@/lib/repo/projects";
import type { Project } from "@/lib/types";

type ActionState = { error?: string };
type ProjectAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

export function ProjectForm({ project, action }: { project?: Project; action: ProjectAction }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Əsas məlumat</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Slug (URL)" htmlFor="slug" hint="məs: meridian-financial-tower">
            <Input id="slug" name="slug" defaultValue={project?.slug} required className="mt-2 rounded-sm" />
          </Field>
          <Field label="Sektor" htmlFor="sector">
            <select
              id="sector"
              name="sector"
              defaultValue={project?.sector ?? "commercial"}
              className="mt-2 h-9 w-full rounded-sm border border-input bg-transparent px-3 text-sm"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sahə (Area)" htmlFor="area">
            <Input id="area" name="area" defaultValue={project?.area} required className="mt-2 rounded-sm" />
          </Field>
          <Field label="Tamamlanma tarixi" htmlFor="completionDate" hint="məs: 2023-11">
            <Input id="completionDate" name="completionDate" defaultValue={project?.completionDate} required className="mt-2 rounded-sm" />
          </Field>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <LocalizedTextField name="title" label="Başlıq" defaultValue={project?.title} />
          <LocalizedTextField name="location" label="Yer" defaultValue={project?.location} />
          <LocalizedTextField name="client" label="Sifarişçi" defaultValue={project?.client} />
          <LocalizedTextField name="scope" label="Əhatə dairəsi" defaultValue={project?.scope} />
        </div>
        <div className="mt-5">
          <LocalizedTextField name="summary" label="Qısa xülasə" defaultValue={project?.summary} multiline />
        </div>
        <label className="mt-5 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} className="size-4 accent-gold-500" />
          Seçilmiş layihə kimi göstər (ana səhifədə)
        </label>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Şəkillər</h2>
        <div className="mt-5 space-y-5">
          <ImageField name="heroImage" label="Əsas şəkil (Hero)" defaultValue={project?.heroImage} />
          <ImageField name="beforeImage" label="Əvvəl şəkli (könüllü)" defaultValue={project?.beforeImage} required={false} />
          <ImageField name="afterImage" label="Sonra şəkli (könüllü)" defaultValue={project?.afterImage} required={false} />
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
            defaultValue={project?.gallery}
            hint='[{"src":"https://...","alt":"...","width":1200,"height":900}]'
          />
          <JsonField
            name="overview_json"
            label="Ümumi baxış (paraqraflar)"
            defaultValue={project?.overview}
            hint='[{"en":"...","az":"...","ru":"..."}]'
          />
          <JsonField
            name="challenges_json"
            label="Çətinliklər"
            defaultValue={project?.challenges}
            hint='[{"en":"...","az":"...","ru":"..."}]'
          />
          <JsonField
            name="solutions_json"
            label="Həllər"
            defaultValue={project?.solutions}
            hint='[{"en":"...","az":"...","ru":"..."}]'
          />
          <JsonField
            name="timeline_json"
            label="Xronologiya"
            defaultValue={project?.timeline}
            hint='[{"date":{"en":"Q1 2021"},"label":{"en":"..."}}]'
          />
          <Field label="Texnologiyalar" htmlFor="technologies" hint="vergüllə ayırın: BIM, Drone Survey, ...">
            <Input
              id="technologies"
              name="technologies"
              defaultValue={project?.technologies?.join(", ")}
              className="mt-2 rounded-sm"
            />
          </Field>
          <Field label="Əlaqəli layihələr (slug)" htmlFor="relatedProjectSlugs" hint="vergüllə ayırın">
            <Input
              id="relatedProjectSlugs"
              name="relatedProjectSlugs"
              defaultValue={project?.relatedProjectSlugs?.join(", ")}
              className="mt-2 rounded-sm"
            />
          </Field>
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
