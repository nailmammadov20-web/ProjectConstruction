import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { getLocalized, type Locale, type SiteSettings } from "@/lib/types";
import { Reveal } from "@/components/motion/reveal";
import { Quote } from "lucide-react";

export async function CeoMessage({ settings }: { settings: SiteSettings }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section className="section-padding bg-muted/40">
      <div className="container-wide">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-12 rounded-sm border border-border bg-card p-8 sm:p-12 lg:grid-cols-[280px_1fr] lg:gap-16">
            <div className="relative mx-auto aspect-[4/5] w-48 overflow-hidden rounded-sm lg:w-full">
              <Image src={settings.ceoPhoto.src} alt={settings.ceoPhoto.alt} fill sizes="280px" className="object-cover" />
            </div>
            <div>
              <Quote className="size-9 text-gold-500" />
              <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
                {t("ceoTitle")}
              </span>
              <p className="mt-4 text-xl font-medium leading-relaxed text-foreground text-balance sm:text-2xl">
                &ldquo;{getLocalized(settings.ceoQuote, locale)}&rdquo;
              </p>
              <div className="mt-6">
                <p className="text-sm font-bold text-foreground">{settings.ceoName}</p>
                <p className="text-xs text-muted-foreground">{getLocalized(settings.ceoRole, locale)}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
