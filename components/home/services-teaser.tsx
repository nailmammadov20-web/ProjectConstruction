"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/section-title";
import { ServiceCard } from "@/components/service-card";
import { Reveal } from "@/components/motion/reveal";
import type { Service } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export function ServicesTeaser({ services }: { services: Service[] }) {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionTitle eyebrow={t("servicesEyebrow")} title={t("servicesTitle")} body={t("servicesBody")} />
          <Reveal delay={0.1}>
            <Button
              render={<Link href="/services" />}
              nativeButton={false}
              variant="outline"
              className="shrink-0 rounded-sm"
            >
              {tNav("viewAllServices")} <ArrowRight className="ml-1 size-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
