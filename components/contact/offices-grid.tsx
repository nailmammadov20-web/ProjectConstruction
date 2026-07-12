"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getLocalized } from "@/lib/types";
import type { Office } from "@/lib/types";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { MapPin, Phone, Mail, Star } from "lucide-react";

export function OfficesGrid({ offices }: { offices: Office[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("contact");

  return (
    <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.08}>
      {offices.map((office) => (
        <RevealItem key={office.email}>
          <div className="relative h-full rounded-sm border border-border bg-card p-7">
            {office.isHeadquarters && (
              <span className="absolute right-5 top-5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-gold-600">
                <Star className="size-3 fill-gold-500 text-gold-500" /> HQ
              </span>
            )}
            <h3 className="text-lg font-bold text-foreground">
              {getLocalized(office.city, locale)}, {getLocalized(office.country, locale)}
            </h3>
            <div className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" />
                {getLocalized(office.address, locale)}
              </p>
              <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 hover:text-gold-600">
                <Phone className="size-4 shrink-0 text-gold-500" />
                {office.phone}
              </a>
              <a href={`mailto:${office.email}`} className="flex items-center gap-2.5 hover:text-gold-600">
                <Mail className="size-4 shrink-0 text-gold-500" />
                {office.email}
              </a>
            </div>
            <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
              {t("hoursTitle")}: {t("hours")}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
