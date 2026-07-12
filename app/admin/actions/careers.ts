"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { readLocalized } from "@/lib/admin-form-utils";

function buildData(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: readLocalized(formData, "title"),
    department: String(formData.get("department") ?? "").trim(),
    location: readLocalized(formData, "location"),
    type: readLocalized(formData, "type"),
    summary: readLocalized(formData, "summary"),
    isOpen: formData.get("isOpen") === "on",
  };
}

export async function createJobOpening(_prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.slug) return { error: "Slug tələb olunur." };
    await prisma.jobOpening.create({ data });
  } catch {
    return { error: "Vakansiya yaradıla bilmədi. Slug artıq mövcud ola bilər." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/careers");
}

export async function updateJobOpening(id: string, _prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.slug) return { error: "Slug tələb olunur." };
    await prisma.jobOpening.update({ where: { id }, data });
  } catch {
    return { error: "Vakansiya yenilənə bilmədi." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/careers");
}

export async function deleteJobOpening(id: string) {
  try {
    await prisma.jobOpening.delete({ where: { id } });
  } catch {
    return { error: "Vakansiya silinə bilmədi." };
  }
  revalidatePath("/", "layout");
}
