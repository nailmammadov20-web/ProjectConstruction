"use server";

import { prisma } from "@/lib/db";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function uploadResume(formData: FormData): Promise<{ url: string } | { error: string }> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Fayl seçilmədi." };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Dəstəklənməyən fayl formatı (yalnız PDF, DOC, DOCX)." };
  }
  if (file.size > MAX_SIZE) {
    return { error: `Fayl çox böyükdür (maks. ${MAX_SIZE / 1024 / 1024}MB).` };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await prisma.mediaAsset.create({
    data: {
      filename: file.name,
      mimeType: file.type,
      size: file.size,
      data: buffer,
    },
  });

  return { url: `/api/media/${asset.id}` };
}
