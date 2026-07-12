"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField, JsonField, ImageField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import type { NewsArticle } from "@/lib/types";

type ActionState = { error?: string };
type ArticleAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

const categories = ["company", "projects", "industry", "sustainability", "awards"];

export function NewsForm({ article, action }: { article?: NewsArticle; action: ArticleAction }) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

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
          <LocalizedTextField name="authorRole" label="Müəllifin vəzifəsi" defaultValue={article?.authorRole} />
          <LocalizedTextField name="title" label="Başlıq" defaultValue={article?.title} />
          <LocalizedTextField name="excerpt" label="Qısa xülasə" defaultValue={article?.excerpt} multiline />
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
          <JsonField
            name="body_json"
            label="Mətn (paraqraflar)"
            defaultValue={article?.body}
            rows={10}
            hint='[{"en":"...","az":"...","ru":"..."}]'
          />
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
