"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function markMessageReviewed(id: string) {
  await prisma.contactSubmission.update({ where: { id }, data: { status: "reviewed" } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  try {
    await prisma.contactSubmission.delete({ where: { id } });
  } catch {
    return { error: "Mesaj silinə bilmədi." };
  }
  revalidatePath("/admin/messages");
}

export async function markApplicationReviewed(id: string) {
  await prisma.jobApplication.update({ where: { id }, data: { status: "reviewed" } });
  revalidatePath("/admin/applications");
}

export async function deleteApplication(id: string) {
  try {
    await prisma.jobApplication.delete({ where: { id } });
  } catch {
    return { error: "Müraciət silinə bilmədi." };
  }
  revalidatePath("/admin/applications");
}
