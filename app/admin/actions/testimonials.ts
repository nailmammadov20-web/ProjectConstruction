"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { readLocalized, readOptionalImage } from "@/lib/admin-form-utils";

function buildData(formData: FormData) {
  return {
    quote: readLocalized(formData, "quote"),
    author: String(formData.get("author") ?? "").trim(),
    role: readLocalized(formData, "role"),
    company: String(formData.get("company") ?? "").trim(),
    photo: readOptionalImage(formData, "photo"),
  };
}

export async function createTestimonial(_prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.author || !data.company) return { error: "Müəllif və şirkət tələb olunur." };
    await prisma.testimonial.create({ data });
  } catch {
    return { error: "Rəy yaradıla bilmədi." };
  }
  revalidatePath("/[locale]", "layout");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, _prevState: { error?: string }, formData: FormData) {
  try {
    const data = buildData(formData);
    if (!data.author || !data.company) return { error: "Müəllif və şirkət tələb olunur." };
    await prisma.testimonial.update({ where: { id }, data });
  } catch {
    return { error: "Rəy yenilənə bilmədi." };
  }
  revalidatePath("/[locale]", "layout");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } });
  } catch {
    return { error: "Rəy silinə bilmədi." };
  }
  revalidatePath("/[locale]", "layout");
}
