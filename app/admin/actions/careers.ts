"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { readLocalized, readJson } from "@/lib/admin-form-utils";
import type { LocalizedText } from "@/lib/types";

function buildData(formData: FormData) {
  const experienceLevel = readLocalized(formData, "experienceLevel");
  const deadline = String(formData.get("applicationDeadline") ?? "").trim();

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: readLocalized(formData, "title"),
    department: String(formData.get("department") ?? "").trim(),
    location: readLocalized(formData, "location"),
    type: readLocalized(formData, "type"),
    summary: readLocalized(formData, "summary"),
    responsibilities: readJson<LocalizedText[]>(formData, "responsibilities_json", []),
    requirements: readJson<LocalizedText[]>(formData, "requirements_json", []),
    experienceLevel: experienceLevel?.en ? experienceLevel : Prisma.JsonNull,
    applicationDeadline: deadline ? new Date(deadline) : null,
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
  revalidatePath("/[locale]", "layout");
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
  revalidatePath("/[locale]", "layout");
  redirect("/admin/careers");
}

export async function deleteJobOpening(id: string) {
  try {
    await prisma.jobOpening.delete({ where: { id } });
  } catch {
    return { error: "Vakansiya silinə bilmədi." };
  }
  revalidatePath("/[locale]", "layout");
}
