"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { readLocalized, readImage } from "@/lib/admin-form-utils";

function buildData(formData: FormData) {
  const bio = readLocalized(formData, "bio");
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    role: readLocalized(formData, "role"),
    photo: readImage(formData, "photo"),
    bio: bio.en ? bio : undefined,
  };
}

export async function createTeamMember(_prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.slug || !data.name) return { error: "Ad və slug tələb olunur." };
    await prisma.teamMember.create({ data });
  } catch {
    return { error: "Üzv yaradıla bilmədi. Slug artıq mövcud ola bilər." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/team");
}

export async function updateTeamMember(id: string, _prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.slug || !data.name) return { error: "Ad və slug tələb olunur." };
    await prisma.teamMember.update({ where: { id }, data });
  } catch {
    return { error: "Üzv yenilənə bilmədi." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({ where: { id } });
  } catch {
    return { error: "Üzv silinə bilmədi." };
  }
  revalidatePath("/", "layout");
}
