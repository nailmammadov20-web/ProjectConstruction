"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const activeLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchTo(nextLocale: Locale) {
    router.replace(
      // @ts-expect-error dynamic segments are passed through as-is
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-sm font-medium tracking-wide transition-colors cursor-pointer",
          variant === "light"
            ? "text-white/80 hover:text-white"
            : "text-navy-900 hover:text-gold-600",
        )}
        aria-label="Switch language"
      >
        <Globe className="size-4" />
        {localeLabels[activeLocale as Locale]}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchTo(loc)}
            className={cn(
              "cursor-pointer justify-between",
              loc === activeLocale && "font-semibold text-gold-600",
            )}
          >
            {localeLabels[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
