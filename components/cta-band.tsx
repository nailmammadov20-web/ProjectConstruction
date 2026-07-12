"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { placeholderImage } from "@/lib/images";
import { ArrowRight } from "lucide-react";

export function CtaBand({
  title,
  body,
  buttonLabel,
  href = "/contact",
}: {
  title: string;
  body: string;
  buttonLabel: string;
  href?: string;
}) {
  const image = placeholderImage("cta-band", 2000, 900, "Construction site at dusk with cranes silhouetted");

  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 sm:py-28">
      <div className="absolute inset-0">
        <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/60" />
      </div>
      <div className="container-wide relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="max-w-xl">
          <h2 className="text-3xl font-bold leading-tight text-white text-balance sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">{body}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Button
            render={<Link href={href} />}
            nativeButton={false}
            size="lg"
            className="shrink-0 rounded-sm bg-gold-500 px-8 text-navy-900 hover:bg-gold-400"
          >
            {buttonLabel} <ArrowRight className="ml-1 size-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
