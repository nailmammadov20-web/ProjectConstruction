"use client";

import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/section-title";
import { TestimonialCarousel } from "@/components/testimonial-carousel";

export function TestimonialsSection() {
  const t = useTranslations("home");

  return (
    <section className="section-padding bg-navy-950">
      <div className="container-wide">
        <SectionTitle
          eyebrow={t("testimonialsEyebrow")}
          title={t("testimonialsTitle")}
          align="center"
          theme="dark"
          className="mx-auto"
        />
        <div className="mt-14">
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
}
