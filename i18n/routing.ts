import { defineRouting } from "next-intl/routing";

export const locales = ["en", "az", "ru"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  az: "Azərbaycan",
  ru: "Русский",
};

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  az: "AZ",
  ru: "RU",
};

export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
