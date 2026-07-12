import { cache } from "react";
import { prisma } from "@/lib/db";
import type { Office, LocalizedText } from "@/lib/types";
import type { Office as PrismaOffice } from "@prisma/client";

function toOffice(row: PrismaOffice): Office {
  return {
    city: row.city as unknown as LocalizedText,
    country: row.country as unknown as LocalizedText,
    address: row.address as unknown as LocalizedText,
    phone: row.phone,
    email: row.email,
    isHeadquarters: row.isHeadquarters,
    mapEmbedUrl: row.mapEmbedUrl,
  };
}

export const getOffices = cache(async (): Promise<Office[]> => {
  const rows = await prisma.office.findMany({ orderBy: { order: "asc" } });
  return rows.map(toOffice);
});
