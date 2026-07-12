import { cache } from "react";
import { prisma } from "@/lib/db";
import type { Testimonial, ImageAsset, LocalizedText } from "@/lib/types";
import type { Testimonial as PrismaTestimonial } from "@prisma/client";

function toTestimonial(row: PrismaTestimonial): Testimonial {
  return {
    quote: row.quote as unknown as LocalizedText,
    author: row.author,
    role: row.role as unknown as LocalizedText,
    company: row.company,
    photo: (row.photo as unknown as ImageAsset | null) ?? undefined,
  };
}

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return rows.map(toTestimonial);
});
