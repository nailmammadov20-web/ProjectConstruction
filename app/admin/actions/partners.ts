"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { readOptionalImage } from "@/lib/admin-form-utils";

function buildData(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    logo: readOptionalImage(formData, "logo"),
  };
}

export async function createPartner(_prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.name) return { error: "Ad tələb olunur." };
    await prisma.partner.create({ data });
  } catch {
    return { error: "Tərəfdaş yaradıla bilmədi." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/partners");
}

export async function updatePartner(id: string, _prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.name) return { error: "Ad tələb olunur." };
    await prisma.partner.update({ where: { id }, data });
  } catch {
    return { error: "Tərəfdaş yenilənə bilmədi." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/partners");
}

export async function deletePartner(id: string) {
  try {
    await prisma.partner.delete({ where: { id } });
  } catch {
    return { error: "Tərəfdaş silinə bilmədi." };
  }
  revalidatePath("/", "layout");
}
