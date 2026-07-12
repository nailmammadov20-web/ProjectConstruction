"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getLocalized, type Service } from "@/lib/types";
import { getIcon } from "@/lib/icon-map";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const Icon = getIcon(service.icon);

  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl"
      >
        <div>
          <div className="flex size-12 items-center justify-center rounded-sm bg-navy-900 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
            <Icon className="size-5" />
          </div>
          <h3 className="mt-6 text-lg font-bold text-foreground">
            {getLocalized(service.title, locale)}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
            {getLocalized(service.shortDescription, locale)}
          </p>
        </div>
        <div className="mt-8 flex items-center gap-1.5 text-sm font-semibold text-gold-600">
          {t("learnMore")}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </Reveal>
  );
}
