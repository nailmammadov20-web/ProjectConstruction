"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import { placeholderImage } from "@/lib/images";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const points = [
  "22+ years delivering complex, high-value projects",
  "ISO 9001, 14001 & 45001 certified operations",
  "120+ engineers and specialists across 18 countries",
];

export function AboutTeaser() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const image1 = placeholderImage("about-teaser-1", 900, 1100, "Engineers reviewing plans on an active site");
  const image2 = placeholderImage("about-teaser-2", 700, 620, "Close-up of structural steel detailing");

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-wide grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm">
            <Image src={image1.src} alt={image1.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-6 hidden aspect-[4/3.5] w-52 overflow-hidden rounded-sm border-4 border-background shadow-xl sm:block lg:-right-10">
            <Image src={image2.src} alt={image2.alt} fill sizes="220px" className="object-cover" />
          </div>
        </Reveal>

        <div>
          <SectionTitle eyebrow={t("aboutEyebrow")} title={t("aboutTitle")} body={t("aboutBody")} />
          <ul className="mt-8 space-y-3.5">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-foreground/85 sm:text-base">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-500" />
                {point}
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
