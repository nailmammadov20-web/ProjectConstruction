import type { Locale } from "@/lib/types";

// Formatted manually (not via Intl.DateTimeFormat) because ICU data for
// less-common locales like az-AZ can differ between Node's and the
// browser's bundled ICU versions, which produces SSR/hydration text
// mismatches. A fixed table guarantees identical output everywhere.
const months: Record<Locale, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  az: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"],
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
};

export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  const day = date.getUTCDate();
  const month = months[locale][date.getUTCMonth()];
  const year = date.getUTCFullYear();

  if (locale === "en") return `${month} ${day}, ${year}`;
  return `${day} ${month} ${year}`;
}
