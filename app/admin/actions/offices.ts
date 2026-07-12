"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { readLocalized } from "@/lib/admin-form-utils";

function buildData(formData: FormData) {
  return {
    city: readLocalized(formData, "city"),
    country: readLocalized(formData, "country"),
    address: readLocalized(formData, "address"),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    isHeadquarters: formData.get("isHeadquarters") === "on",
    mapEmbedUrl: String(formData.get("mapEmbedUrl") ?? "").trim(),
  };
}

export async function createOffice(_prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.email || !data.phone) return { error: "Telefon və e-poçt tələb olunur." };
    await prisma.office.create({ data });
  } catch {
    return { error: "Ofis yaradıla bilmədi." };
  }
  revalidatePath("/[locale]", "layout");
  redirect("/admin/offices");
}

export async function updateOffice(id: string, _prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.email || !data.phone) return { error: "Telefon və e-poçt tələb olunur." };
    await prisma.office.update({ where: { id }, data });
  } catch {
    return { error: "Ofis yenilənə bilmədi." };
  }
  revalidatePath("/[locale]", "layout");
  redirect("/admin/offices");
}

export async function deleteOffice(id: string) {
  try {
    await prisma.office.delete({ where: { id } });
  } catch {
    return { error: "Ofis silinə bilmədi." };
  }
  revalidatePath("/[locale]", "layout");
}
