import { cache } from "react";
import { prisma } from "@/lib/db";
import type { SiteSettings, LocalizedText, ImageAsset, Achievement, TimelineEntry } from "@/lib/types";
import type { SiteSettings as PrismaSiteSettings } from "@prisma/client";

function toSettings(row: PrismaSiteSettings): SiteSettings {
  return {
    heroEyebrow: row.heroEyebrow as unknown as LocalizedText,
    heroTitle: row.heroTitle as unknown as LocalizedText,
    heroSubtitle: row.heroSubtitle as unknown as LocalizedText,
    heroVideoUrl: row.heroVideoUrl ?? undefined,
    heroImage: row.heroImage as unknown as ImageAsset,
    statExperience: row.statExperience,
    statProjects: row.statProjects,
    statCountries: row.statCountries,
    statEngineers: row.statEngineers,
    aboutIntro: row.aboutIntro as unknown as LocalizedText,
    missionText: row.missionText as unknown as LocalizedText,
    visionText: row.visionText as unknown as LocalizedText,
    ceoName: row.ceoName,
    ceoRole: row.ceoRole as unknown as LocalizedText,
    ceoQuote: row.ceoQuote as unknown as LocalizedText,
    ceoPhoto: row.ceoPhoto as unknown as ImageAsset,
    achievements: row.achievements as unknown as Achievement[],
    companyTimeline: row.companyTimeline as unknown as TimelineEntry[],
    hseBody: row.hseBody as unknown as LocalizedText,
    qualityPolicyBody: row.qualityPolicyBody as unknown as LocalizedText,
    environmentBody: row.environmentBody as unknown as LocalizedText,
    safetyLtifr: row.safetyLtifr,
    safetyManHours: row.safetyManHours,
    safetyAuditedPct: row.safetyAuditedPct,
    safetyFatalities: row.safetyFatalities,
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const row = await prisma.siteSettings.findUniqueOrThrow({ where: { id: "main" } });
  return toSettings(row);
});
