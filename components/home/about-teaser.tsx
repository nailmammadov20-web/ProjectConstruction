"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import { getLocalized, type Locale, type SiteSettings } from "@/lib/types";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function AboutTeaser({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-wide grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[16/10] w-full max-w-md overflow-hidden rounded-sm sm:aspect-[4/5]">
            <Image
              src={settings.aboutTeaserImage1.src}
              alt={settings.aboutTeaserImage1.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-6 hidden aspect-[4/3.5] w-52 overflow-hidden rounded-sm border-4 border-background shadow-xl sm:block lg:-right-10">
            <Image
              src={settings.aboutTeaserImage2.src}
              alt={settings.aboutTeaserImage2.alt}
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <SectionTitle
            eyebrow={t("aboutEyebrow")}
            title={getLocalized(settings.aboutTeaserTitle, locale)}
            body={getLocalized(settings.aboutIntro, locale)}
          />
          <ul className="mt-8 space-y-3.5">
            {settings.aboutHighlights.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-foreground/85 sm:text-base">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-500" />
                {getLocalized(point, locale)}
              </li>
            ))}
          </ul>
          <Button
            render={<Link href="/about" />}
            nativeButton={false}
            size="lg"
            className="mt-9 rounded-sm bg-navy-900 text-white hover:bg-navy-800"
          >
            {tCommon("learnMore")} <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
