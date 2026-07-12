"use client";

import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/section-title";
import { ProcessTimeline } from "@/components/process-timeline";

export function ProcessSection() {
  const t = useTranslations("home");

  return (
    <section className="section-padding bg-muted/40">
      <div className="container-wide">
        <SectionTitle eyebrow={t("processEyebrow")} title={t("processTitle")} align="center" className="mx-auto" />
        <div className="mt-14">
          <ProcessTimeline />
        </div>
      </div>
    </section>
  );
}
