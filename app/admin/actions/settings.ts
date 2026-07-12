"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { readLocalized, readImage, readJson, AdminFormError } from "@/lib/admin-form-utils";
import type { Achievement, TimelineEntry } from "@/lib/types";

export async function updateSiteSettings(_prevState: { error?: string; success?: boolean }, formData: FormData) {
  try {
    const heroVideoUrl = String(formData.get("heroVideoUrl") ?? "").trim();

    const data = {
      heroEyebrow: readLocalized(formData, "heroEyebrow"),
      heroTitle: readLocalized(formData, "heroTitle"),
      heroSubtitle: readLocalized(formData, "heroSubtitle"),
      heroVideoUrl: heroVideoUrl || null,
      heroImage: readImage(formData, "heroImage"),
      statExperience: Number(formData.get("statExperience") ?? 0) || 0,
      statProjects: Number(formData.get("statProjects") ?? 0) || 0,
      statCountries: Number(formData.get("statCountries") ?? 0) || 0,
      statEngineers: Number(formData.get("statEngineers") ?? 0) || 0,
      aboutIntro: readLocalized(formData, "aboutIntro"),
      missionText: readLocalized(formData, "missionText"),
      visionText: readLocalized(formData, "visionText"),
      ceoName: String(formData.get("ceoName") ?? "").trim(),
      ceoRole: readLocalized(formData, "ceoRole"),
      ceoQuote: readLocalized(formData, "ceoQuote"),
      ceoPhoto: readImage(formData, "ceoPhoto"),
      achievements: readJson<Achievement[]>(formData, "achievements_json", []),
      companyTimeline: readJson<TimelineEntry[]>(formData, "companyTimeline_json", []),
      hseBody: readLocalized(formData, "hseBody"),
      qualityPolicyBody: readLocalized(formData, "qualityPolicyBody"),
      environmentBody: readLocalized(formData, "environmentBody"),
      safetyLtifr: Number(formData.get("safetyLtifr") ?? 0) || 0,
      safetyManHours: Number(formData.get("safetyManHours") ?? 0) || 0,
      safetyAuditedPct: Number(formData.get("safetyAuditedPct") ?? 0) || 0,
      safetyFatalities: Number(formData.get("safetyFatalities") ?? 0) || 0,
    };

    await prisma.siteSettings.upsert({
      where: { id: "main" },
      update: data,
      create: { id: "main", ...data },
    });
  } catch (error) {
    if (error instanceof AdminFormError) return { error: error.message };
    return { error: "Tənzimləmələr yadda saxlanıla bilmədi." };
  }
  revalidatePath("/[locale]", "layout");
  return { success: true };
}
