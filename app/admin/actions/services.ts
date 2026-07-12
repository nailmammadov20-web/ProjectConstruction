"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { readLocalized, readImage, readJson, readStringArray, AdminFormError } from "@/lib/admin-form-utils";
import type { LocalizedText, ServiceFAQ } from "@/lib/types";

function buildData(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    icon: String(formData.get("icon") ?? "HardHat").trim(),
    title: readLocalized(formData, "title"),
    shortDescription: readLocalized(formData, "shortDescription"),
    heroImage: readImage(formData, "heroImage"),
    gallery: readJson(formData, "gallery_json", []),
    description: readJson<LocalizedText[]>(formData, "description_json", []),
    benefits: readJson<LocalizedText[]>(formData, "benefits_json", []),
    process: readJson<LocalizedText[]>(formData, "process_json", []),
    faq: readJson<ServiceFAQ[]>(formData, "faq_json", []),
    relatedServiceSlugs: readStringArray(formData, "relatedServiceSlugs"),
  };
}

export async function createService(_prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.slug) return { error: "Slug tələb olunur." };
    await prisma.service.create({ data });
  } catch (error) {
    if (error instanceof AdminFormError) return { error: error.message };
    return { error: "Xidmət yaradıla bilmədi. Slug artıq mövcud ola bilər." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/services");
}

export async function updateService(id: string, _prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.slug) return { error: "Slug tələb olunur." };
    await prisma.service.update({ where: { id }, data });
  } catch (error) {
    if (error instanceof AdminFormError) return { error: error.message };
    return { error: "Xidmət yenilənə bilmədi." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({ where: { id } });
  } catch {
    return { error: "Xidmət silinə bilmədi." };
  }
  revalidatePath("/", "layout");
}
