import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { getServices } from "@/lib/repo/services";
import { getProjects } from "@/lib/repo/projects";
import { getNewsArticles } from "@/lib/repo/news";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext", "cyrillic-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${t("siteName")} — ${t("tagline")}`,
      template: `%s — ${t("siteName")}`,
    },
    description:
      "International construction, engineering and project management group delivering commercial, industrial and public infrastructure projects across 18 countries.",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        az: "/az",
        ru: "/ru",
      },
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale,
      url: `${siteConfig.url}/${locale}`,
      images: ["/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }
  const locale: Locale = rawLocale;
  setRequestLocale(locale);

  const [services, projects, newsArticles] = await Promise.all([
    getServices(),
    getProjects(),
    getNewsArticles(),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <OrganizationJsonLd />
            <ScrollProgress />
            <Navbar services={services} projects={projects} newsArticles={newsArticles} />
            <main className="flex-1">{children}</main>
            <Footer services={services} />
            <BackToTop />
            <CookieConsent />
            <Toaster position="bottom-right" richColors />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
