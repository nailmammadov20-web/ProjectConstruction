"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  readLocalized,
  readImage,
  readOptionalImage,
  readJson,
  readStringArray,
  AdminFormError,
} from "@/lib/admin-form-utils";
import type { LocalizedText, ProjectMilestone } from "@/lib/types";

function buildData(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: readLocalized(formData, "title"),
    sector: String(formData.get("sector") ?? "commercial"),
    location: readLocalized(formData, "location"),
    client: readLocalized(formData, "client"),
    area: String(formData.get("area") ?? "").trim(),
    completionDate: String(formData.get("completionDate") ?? "").trim(),
    scope: readLocalized(formData, "scope"),
    summary: readLocalized(formData, "summary"),
    heroImage: readImage(formData, "heroImage"),
    gallery: readJson(formData, "gallery_json", []),
    beforeImage: readOptionalImage(formData, "beforeImage") ?? undefined,
    afterImage: readOptionalImage(formData, "afterImage") ?? undefined,
    overview: readJson<LocalizedText[]>(formData, "overview_json", []),
    challenges: readJson<LocalizedText[]>(formData, "challenges_json", []),
    solutions: readJson<LocalizedText[]>(formData, "solutions_json", []),
    technologies: readStringArray(formData, "technologies"),
    timeline: readJson<ProjectMilestone[]>(formData, "timeline_json", []),
    featured: formData.get("featured") === "on",
    relatedProjectSlugs: readStringArray(formData, "relatedProjectSlugs"),
  };
}

export async function createProject(_prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.slug) return { error: "Slug tələb olunur." };
    await prisma.project.create({ data });
  } catch (error) {
    if (error instanceof AdminFormError) return { error: error.message };
    return { error: "Layihə yaradıla bilmədi. Slug artıq mövcud ola bilər." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/projects");
}

export async function updateProject(id: string, _prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.slug) return { error: "Slug tələb olunur." };
    await prisma.project.update({ where: { id }, data });
  } catch (error) {
    if (error instanceof AdminFormError) return { error: error.message };
    return { error: "Layihə yenilənə bilmədi." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
  } catch {
    return { error: "Layihə silinə bilmədi." };
  }
  revalidatePath("/", "layout");
}
