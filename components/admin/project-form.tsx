"use client";

import * as React from "react";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField, ImageField } from "@/components/admin/form-fields";
import { GalleryRepeater } from "@/components/admin/gallery-repeater";
import { LocalizedListRepeater } from "@/components/admin/localized-list-repeater";
import { ProjectMilestoneRepeater } from "@/components/admin/project-milestone-repeater";
import { TagInput } from "@/components/admin/tag-input";
import { RelatedItemsPicker } from "@/components/admin/related-items-picker";
import { SubmitButton } from "@/components/admin/submit-button";
import { cn } from "@/lib/utils";
import { sectors } from "@/lib/repo/projects";
import type { Project, Locale } from "@/lib/types";

type ActionState = { error?: string };
type ProjectAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

const localeLabels: Record<Locale, string> = { en: "English", az: "Azərbaycan", ru: "Русский" };

export function ProjectForm({
  project,
  action,
  relatedOptions,
}: {
  project?: Project;
  action: ProjectAction;
  relatedOptions: { slug: string; title: string }[];
}) {
  const [state, formAction] = useActionState(action, {});
  const [activeLocale, setActiveLocale] = React.useState<Locale>("en");

  return (
    <form action={formAction} className="space-y-8">
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
          <LocalizedTextField name="title" label="Başlıq" defaultValue={project?.title} activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
          <LocalizedTextField name="location" label="Yer" defaultValue={project?.location} activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
          <LocalizedTextField name="client" label="Sifarişçi" defaultValue={project?.client} activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
          <LocalizedTextField name="scope" label="Əhatə dairəsi" defaultValue={project?.scope} activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
        </div>
        <div className="mt-5">
          <LocalizedTextField name="summary" label="Qısa xülasə" defaultValue={project?.summary} multiline activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
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
          <div className="border-t border-border pt-5">
            <GalleryRepeater
              name="gallery_json"
              label="Qalereya"
              defaultValue={project?.gallery ?? []}
              hint="Layihə qalereyasına şəkil əlavə edin — URL yapışdırın və ya birbaşa yükləyin."
            />
          </div>
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Layihə Təsviri</h2>
        <div className="mt-5 space-y-5">
          <LocalizedListRepeater
            name="overview_json"
            label="Ümumi baxış (paraqraflar)"
            defaultValue={project?.overview ?? []}
            hint="Hər paraqraf ayrı kart kimi əlavə olunur."
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
            addLabel="Paraqraf əlavə et"
          />
          <div className="border-t border-border pt-5">
            <LocalizedListRepeater
              name="challenges_json"
              label="Çətinliklər"
              defaultValue={project?.challenges ?? []}
              activeLocale={activeLocale}
              onActiveLocaleChange={setActiveLocale}
              addLabel="Çətinlik əlavə et"
              emptyLabel="Hələ çətinlik əlavə edilməyib."
            />
          </div>
          <div className="border-t border-border pt-5">
            <LocalizedListRepeater
              name="solutions_json"
              label="Həllər"
              defaultValue={project?.solutions ?? []}
              activeLocale={activeLocale}
              onActiveLocaleChange={setActiveLocale}
              addLabel="Həll əlavə et"
              emptyLabel="Hələ həll əlavə edilməyib."
            />
          </div>
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Xronologiya</h2>
        <div className="mt-5">
          <ProjectMilestoneRepeater
            name="timeline_json"
            label="Layihə mərhələləri"
            defaultValue={project?.timeline ?? []}
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Əlaqələr</h2>
        <div className="mt-5 space-y-5">
          <TagInput
            name="technologies"
            label="Texnologiyalar"
            defaultValue={project?.technologies ?? []}
            hint="Yazıb Enter basın (məs. BIM, Drone Survey)."
            placeholder="Texnologiya yazın..."
          />
          <RelatedItemsPicker
            name="relatedProjectSlugs"
            label="Əlaqəli layihələr"
            options={relatedOptions}
            defaultValue={project?.relatedProjectSlugs ?? []}
            hint="Bu layihə ilə əlaqəli göstəriləcək digər layihələri seçin."
            searchPlaceholder="Layihə axtar..."
          />
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
