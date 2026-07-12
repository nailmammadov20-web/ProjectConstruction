"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { readLocalized } from "@/lib/admin-form-utils";

function buildData(formData: FormData) {
  return {
    code: String(formData.get("code") ?? "").trim(),
    title: readLocalized(formData, "title"),
    issuer: String(formData.get("issuer") ?? "").trim(),
    year: String(formData.get("year") ?? "").trim(),
  };
}

export async function createCertificate(_prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.code) return { error: "Kod tələb olunur." };
    await prisma.certificate.create({ data });
  } catch {
    return { error: "Sertifikat yaradıla bilmədi. Kod artıq mövcud ola bilər." };
  }
  revalidatePath("/[locale]", "layout");
  redirect("/admin/certificates");
}

export async function updateCertificate(id: string, _prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.code) return { error: "Kod tələb olunur." };
    await prisma.certificate.update({ where: { id }, data });
  } catch {
    return { error: "Sertifikat yenilənə bilmədi." };
  }
  revalidatePath("/[locale]", "layout");
  redirect("/admin/certificates");
}

export async function deleteCertificate(id: string) {
  try {
    await prisma.certificate.delete({ where: { id } });
  } catch {
    return { error: "Sertifikat silinə bilmədi." };
  }
  revalidatePath("/[locale]", "layout");
}
