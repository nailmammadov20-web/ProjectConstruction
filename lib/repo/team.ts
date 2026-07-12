import { cache } from "react";
import { prisma } from "@/lib/db";
import type { TeamMember, Certificate, Partner, ImageAsset, LocalizedText } from "@/lib/types";
import type {
  TeamMember as PrismaTeamMember,
  Certificate as PrismaCertificate,
  Partner as PrismaPartner,
} from "@prisma/client";

function toTeamMember(row: PrismaTeamMember): TeamMember {
  return {
    slug: row.slug,
    name: row.name,
    role: row.role as unknown as LocalizedText,
    photo: row.photo as unknown as ImageAsset,
    bio: (row.bio as unknown as LocalizedText | null) ?? undefined,
  };
}

function toCertificate(row: PrismaCertificate): Certificate {
  return {
    code: row.code,
    title: row.title as unknown as LocalizedText,
    issuer: row.issuer,
    year: row.year,
  };
}

function toPartner(row: PrismaPartner): Partner {
  return {
    name: row.name,
    logo: (row.logo as unknown as ImageAsset | null) ?? undefined,
  };
}

export const getLeadershipTeam = cache(async (): Promise<TeamMember[]> => {
  const rows = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  return rows.map(toTeamMember);
});

export const getCertificates = cache(async (): Promise<Certificate[]> => {
  const rows = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
  return rows.map(toCertificate);
});

export const getPartners = cache(async (): Promise<Partner[]> => {
  const rows = await prisma.partner.findMany({ orderBy: { order: "asc" } });
  return rows.map(toPartner);
});
