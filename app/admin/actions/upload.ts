"use server";

import { prisma } from "@/lib/db";

const MAX_SIZE = 4 * 1024 * 1024; // Vercel serverless function body-size safety margin
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

export async function uploadMedia(formData: FormData): Promise<{ url: string } | { error: string }> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Fayl seçilmədi." };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Dəstəklənməyən fayl formatı (yalnız JPEG, PNG, WEBP, GIF, MP4, WEBM)." };
  }
  if (file.size > MAX_SIZE) {
    return {
      error: `Fayl çox böyükdür (maks. ${MAX_SIZE / 1024 / 1024}MB). Böyük videolar üçün YouTube/Vimeo/Cloudflare Stream kimi xarici host istifadə edib keçidi bura yapışdırın.`,
    };
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
