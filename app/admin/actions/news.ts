"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { readLocalized, readImage, readJson, AdminFormError } from "@/lib/admin-form-utils";
import type { LocalizedText } from "@/lib/types";

function buildData(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    category: String(formData.get("category") ?? "company"),
    title: readLocalized(formData, "title"),
    excerpt: readLocalized(formData, "excerpt"),
    coverImage: readImage(formData, "coverImage"),
    publishedAt: new Date(String(formData.get("publishedAt") ?? new Date().toISOString().slice(0, 10))),
    readingMinutes: Number(formData.get("readingMinutes") ?? 3) || 3,
    author: String(formData.get("author") ?? "").trim(),
    authorRole: readLocalized(formData, "authorRole"),
    featured: formData.get("featured") === "on",
    body: readJson<LocalizedText[]>(formData, "body_json", []),
  };
}

export async function createArticle(_prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.slug) return { error: "Slug tələb olunur." };
    if (data.featured) {
      await prisma.newsArticle.updateMany({ data: { featured: false } });
    }
    await prisma.newsArticle.create({ data });
  } catch (error) {
    if (error instanceof AdminFormError) return { error: error.message };
    return { error: "Məqalə yaradıla bilmədi. Slug artıq mövcud ola bilər." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/news");
}

export async function updateArticle(id: string, _prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.slug) return { error: "Slug tələb olunur." };
    if (data.featured) {
      await prisma.newsArticle.updateMany({ where: { id: { not: id } }, data: { featured: false } });
    }
    await prisma.newsArticle.update({ where: { id }, data });
  } catch (error) {
    if (error instanceof AdminFormError) return { error: error.message };
    return { error: "Məqalə yenilənə bilmədi." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/news");
}

export async function deleteArticle(id: string) {
  try {
    await prisma.newsArticle.delete({ where: { id } });
  } catch {
    return { error: "Məqalə silinə bilmədi." };
  }
  revalidatePath("/", "layout");
}
