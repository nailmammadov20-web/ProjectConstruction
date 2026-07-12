import { cache } from "react";
import { prisma } from "@/lib/db";
import type { Service, ServiceFAQ, ImageAsset, LocalizedText } from "@/lib/types";
import type { Service as PrismaService } from "@prisma/client";

function toService(row: PrismaService): Service {
  return {
    slug: row.slug,
    icon: row.icon,
    title: row.title as unknown as LocalizedText,
    shortDescription: row.shortDescription as unknown as LocalizedText,
    heroImage: row.heroImage as unknown as ImageAsset,
    gallery: row.gallery as unknown as ImageAsset[],
    description: row.description as unknown as LocalizedText[],
    benefits: row.benefits as unknown as LocalizedText[],
    process: row.process as unknown as LocalizedText[],
    faq: row.faq as unknown as ServiceFAQ[],
    relatedServiceSlugs: row.relatedServiceSlugs,
  };
}

export const getServices = cache(async (): Promise<Service[]> => {
  const rows = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return rows.map(toService);
});

export const getServiceBySlug = cache(async (slug: string): Promise<Service | undefined> => {
  const row = await prisma.service.findUnique({ where: { slug } });
  return row ? toService(row) : undefined;
});

export async function getRelatedServices(service: Service): Promise<Service[]> {
  if (service.relatedServiceSlugs.length === 0) return [];
  const rows = await prisma.service.findMany({
    where: { slug: { in: service.relatedServiceSlugs } },
  });
  return rows.map(toService);
}
