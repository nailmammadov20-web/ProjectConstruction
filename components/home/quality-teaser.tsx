"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/section-title";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocalized, type Certificate, type Locale, type SiteSettings } from "@/lib/types";
import { ArrowRight, Award } from "lucide-react";

export function QualityTeaser({ certificates, settings }: { certificates: Certificate[]; settings: SiteSettings }) {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-wide grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionTitle
            eyebrow={t("qualityEyebrow")}
            title={getLocalized(settings.qualityTeaserTitle, locale)}
            body={getLocalized(settings.qualityTeaserBody, locale)}
          />

          <RevealGroup className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3" stagger={0.06}>
            {certificates.map((cert) => (
              <RevealItem key={cert.code}>
                <div className="flex h-full flex-col justify-between rounded-sm border border-border bg-card p-4">
                  <Award className="size-5 text-gold-500" />
                  <div className="mt-3">
                    <p className="text-xs font-bold text-foreground">{cert.issuer}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{cert.title.en}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Button
            render={<Link href="/quality-safety" />}
            nativeButton={false}
            size="lg"
            className="mt-9 rounded-sm bg-navy-900 text-white hover:bg-navy-800"
          >
            {tCommon("learnMore")} <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>

        <Reveal>
          <div className="relative aspect-[4/3.4] w-full overflow-hidden rounded-sm">
            <Image
              src={settings.qualityTeaserImage.src}
              alt={settings.qualityTeaserImage.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
