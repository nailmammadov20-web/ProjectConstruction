"use client";

import * as React from "react";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField, ImageField } from "@/components/admin/form-fields";
import { GalleryRepeater } from "@/components/admin/gallery-repeater";
import { LocalizedListRepeater } from "@/components/admin/localized-list-repeater";
import { FaqRepeater } from "@/components/admin/faq-repeater";
import { RelatedItemsPicker } from "@/components/admin/related-items-picker";
import { SubmitButton } from "@/components/admin/submit-button";
import { cn } from "@/lib/utils";
import { iconMap } from "@/lib/icon-map";
import type { Service, Locale } from "@/lib/types";

type ActionState = { error?: string };
type ServiceAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

const localeLabels: Record<Locale, string> = { en: "English", az: "Azərbaycan", ru: "Русский" };

export function ServiceForm({
  service,
  action,
  relatedOptions,
}: {
  service?: Service;
  action: ServiceAction;
  relatedOptions: { slug: string; title: string }[];
}) {
  const [state, formAction] = useActionState(action, {});
  const [activeLocale, setActiveLocale] = React.useState<Locale>("en");
  const iconNames = Object.keys(iconMap);

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
          <LocalizedTextField name="title" label="Başlıq" defaultValue={service?.title} activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
          <LocalizedTextField name="shortDescription" label="Qısa təsvir" defaultValue={service?.shortDescription} multiline activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Şəkillər</h2>
        <div className="mt-5 space-y-5">
          <ImageField name="heroImage" label="Hero şəkli" defaultValue={service?.heroImage} />
          <div className="border-t border-border pt-5">
            <GalleryRepeater
              name="gallery_json"
              label="Qalereya"
              defaultValue={service?.gallery ?? []}
              hint="Xidmət qalereyasına şəkil əlavə edin — URL yapışdırın və ya birbaşa yükləyin."
            />
          </div>
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Məzmun</h2>
        <div className="mt-5 space-y-5">
          <LocalizedListRepeater
            name="description_json"
            label="Təsvir (paraqraflar)"
            defaultValue={service?.description ?? []}
            hint="Hər paraqraf ayrı kart kimi əlavə olunur."
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
            addLabel="Paraqraf əlavə et"
          />
          <div className="border-t border-border pt-5">
            <LocalizedListRepeater
              name="benefits_json"
              label="Üstünlüklər"
              defaultValue={service?.benefits ?? []}
              activeLocale={activeLocale}
              onActiveLocaleChange={setActiveLocale}
              addLabel="Üstünlük əlavə et"
              emptyLabel="Hələ üstünlük əlavə edilməyib."
            />
          </div>
          <div className="border-t border-border pt-5">
            <LocalizedListRepeater
              name="process_json"
              label="Proses addımları"
              defaultValue={service?.process ?? []}
              activeLocale={activeLocale}
              onActiveLocaleChange={setActiveLocale}
              addLabel="Addım əlavə et"
              emptyLabel="Hələ proses addımı əlavə edilməyib."
            />
          </div>
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">FAQ</h2>
        <div className="mt-5">
          <FaqRepeater
            name="faq_json"
            label="Tez-tez verilən suallar"
            defaultValue={service?.faq ?? []}
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Əlaqələr</h2>
        <div className="mt-5">
          <RelatedItemsPicker
            name="relatedServiceSlugs"
            label="Əlaqəli xidmətlər"
            options={relatedOptions}
            defaultValue={service?.relatedServiceSlugs ?? []}
            hint="Bu xidmətlə əlaqəli göstəriləcək digər xidmətləri seçin."
            searchPlaceholder="Xidmət axtar..."
          />
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
