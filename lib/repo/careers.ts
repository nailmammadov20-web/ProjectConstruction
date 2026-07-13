import { cache } from "react";
import { prisma } from "@/lib/db";
import type { JobOpening, LocalizedText } from "@/lib/types";
import type { JobOpening as PrismaJobOpening } from "@prisma/client";

function toJobOpening(row: PrismaJobOpening): JobOpening {
  return {
    slug: row.slug,
    title: row.title as unknown as LocalizedText,
    department: row.department,
    location: row.location as unknown as LocalizedText,
    type: row.type as unknown as LocalizedText,
    summary: row.summary as unknown as LocalizedText,
    responsibilities: row.responsibilities as unknown as LocalizedText[],
    requirements: row.requirements as unknown as LocalizedText[],
    experienceLevel: (row.experienceLevel as unknown as LocalizedText | null) ?? undefined,
    applicationDeadline: row.applicationDeadline?.toISOString() ?? undefined,
  };
}

export const getJobOpenings = cache(async (): Promise<JobOpening[]> => {
  const rows = await prisma.jobOpening.findMany({
    where: { isOpen: true },
    orderBy: { order: "asc" },
  });
  return rows.map(toJobOpening);
});

export const getJobOpeningBySlug = cache(async (slug: string): Promise<JobOpening | undefined> => {
  const row = await prisma.jobOpening.findFirst({ where: { slug, isOpen: true } });
  return row ? toJobOpening(row) : undefined;
});
