import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalContent } from "@/components/legal-content";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Terms of Service",
    alternates: { canonical: `/${locale}/terms` },
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalContent
      title="Terms of Service"
      updated="July 1, 2026"
      sections={[
        {
          heading: "1. Acceptance of Terms",
          body: [
            `By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use this website.`,
          ],
        },
        {
          heading: "2. Use of Website",
          body: [
            "This website and its content are provided for general informational purposes about our company, services, and projects. You may not use this website for any unlawful purpose or in a way that damages, disables, or impairs the site.",
          ],
        },
        {
          heading: "3. Intellectual Property",
          body: [
            `All content on this website, including text, images, logos, and project case studies, is the property of ${siteConfig.legalName} or its licensors and is protected by applicable intellectual property laws. Reproduction without permission is prohibited.`,
          ],
        },
        {
          heading: "4. No Professional Advice",
          body: [
            "Information provided on this website is for general reference only and does not constitute professional engineering, construction, or legal advice. Any engagement for services is subject to a separate written contract.",
          ],
        },
        {
          heading: "5. Limitation of Liability",
          body: [
            `${siteConfig.legalName} shall not be liable for any indirect, incidental, or consequential damages arising from the use of, or inability to use, this website or its content.`,
          ],
        },
        {
          heading: "6. Governing Law",
          body: [
            "These Terms of Service are governed by the laws of the Republic of Azerbaijan, without regard to conflict of law principles.",
          ],
        },
        {
          heading: "7. Changes to These Terms",
          body: [
            "We may revise these Terms of Service at any time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.",
          ],
        },
      ]}
    />
  );
}
