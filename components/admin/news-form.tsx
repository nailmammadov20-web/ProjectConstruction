"use client";

import * as React from "react";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField, ImageField } from "@/components/admin/form-fields";
import { LocalizedListRepeater } from "@/components/admin/localized-list-repeater";
import { SubmitButton } from "@/components/admin/submit-button";
import { cn } from "@/lib/utils";
import type { NewsArticle, Locale } from "@/lib/types";

type ActionState = { error?: string };
type ArticleAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

const categories = ["company", "projects", "industry", "sustainability", "awards"];
const localeLabels: Record<Locale, string> = { en: "English", az: "Azərbaycan", ru: "Русский" };

export function NewsForm({ article, action }: { article?: NewsArticle; action: ArticleAction }) {
  const [state, formAction] = useActionState(action, {});
  const [activeLocale, setActiveLocale] = React.useState<Locale>("en");

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <div className="flex items-center justify-end gap-1 rounded-sm border border-border bg-card p-1 sm:w-fit">
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
          <Field label="Slug (URL)" htmlFor="slug">
            <Input id="slug" name="slug" defaultValue={article?.slug} required className="mt-2 rounded-sm" />
          </Field>
          <Field label="Kateqoriya" htmlFor="category">
            <select
              id="category"
              name="category"
              defaultValue={article?.category ?? "company"}
              className="mt-2 h-9 w-full rounded-sm border border-input bg-transparent px-3 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Dərc tarixi" htmlFor="publishedAt">
            <Input
              id="publishedAt"
              name="publishedAt"
              type="date"
              defaultValue={article?.publishedAt?.slice(0, 10)}
              required
              className="mt-2 rounded-sm"
            />
          </Field>
          <Field label="Oxuma müddəti (dəq)" htmlFor="readingMinutes">
            <Input
              id="readingMinutes"
              name="readingMinutes"
              type="number"
              defaultValue={article?.readingMinutes ?? 3}
              className="mt-2 rounded-sm"
            />
          </Field>
          <Field label="Müəllif" htmlFor="author">
            <Input id="author" name="author" defaultValue={article?.author} required className="mt-2 rounded-sm" />
          </Field>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5">
          <LocalizedTextField name="authorRole" label="Müəllifin vəzifəsi" defaultValue={article?.authorRole} activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
          <LocalizedTextField name="title" label="Başlıq" defaultValue={article?.title} activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
          <LocalizedTextField name="excerpt" label="Qısa xülasə" defaultValue={article?.excerpt} multiline activeLocale={activeLocale} onActiveLocaleChange={setActiveLocale} />
        </div>
        <label className="mt-5 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="featured" defaultChecked={article?.featured} className="size-4 accent-gold-500" />
          Seçilmiş məqalə kimi göstər (yalnız bir məqalə seçilə bilər)
        </label>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Üz qabığı şəkli</h2>
        <div className="mt-5">
          <ImageField name="coverImage" label="Üz qabığı" defaultValue={article?.coverImage} />
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Məqalə mətni</h2>
        <div className="mt-5">
          <LocalizedListRepeater
            name="body_json"
            label="Mətn (paraqraflar)"
            defaultValue={article?.body ?? []}
            hint="Hər paraqraf ayrı kart kimi əlavə olunur."
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
            addLabel="Paraqraf əlavə et"
          />
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
