import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalContent } from "@/components/legal-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Cookie Policy",
    alternates: { canonical: `/${locale}/cookies` },
    robots: { index: true, follow: true },
  };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalContent
      title="Cookie Policy"
      updated="July 1, 2026"
      sections={[
        {
          heading: "1. What Are Cookies",
          body: [
            "Cookies are small text files placed on your device when you visit our website. They help our site function properly, remember your preferences, and give us insight into how visitors use our site.",
          ],
        },
        {
          heading: "2. Types of Cookies We Use",
          body: [
            "Strictly Necessary: required for core site functionality such as navigation and security; these cannot be disabled.",
            "Analytics: help us understand how visitors interact with our website so we can improve it, using aggregated and anonymised data.",
            "Marketing: used to deliver relevant content and measure the effectiveness of our communications, only set with your consent.",
          ],
        },
        {
          heading: "3. Managing Your Preferences",
          body: [
            "You can manage your cookie preferences at any time using the cookie settings link in our website footer, or through your browser settings. Disabling certain cookies may affect site functionality.",
          ],
        },
        {
          heading: "4. Third-Party Cookies",
          body: [
            "Some cookies are placed by third-party services we use for analytics and embedded content (such as maps). These providers have their own privacy and cookie policies.",
          ],
        },
        {
          heading: "5. Updates to This Policy",
          body: [
            "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our operations. Please check this page periodically for updates.",
          ],
        },
      ]}
    />
  );
}
