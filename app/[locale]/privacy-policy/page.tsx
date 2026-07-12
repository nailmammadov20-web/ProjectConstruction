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
    title: "Privacy Policy",
    alternates: { canonical: `/${locale}/privacy-policy` },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalContent
      title="Privacy Policy"
      updated="July 1, 2026"
      sections={[
        {
          heading: "1. Introduction",
          body: [
            `${siteConfig.legalName} ("we", "us", "our") is committed to protecting the privacy of visitors to our website and clients we work with. This Privacy Policy explains what personal data we collect, how we use it, and the rights you have over your information.`,
          ],
        },
        {
          heading: "2. Information We Collect",
          body: [
            "We collect information you provide directly, such as your name, email address, phone number, and company details when you submit a contact form, request a proposal, or apply for a position.",
            "We also automatically collect certain technical information, including IP address, browser type, device information, and pages visited, through cookies and similar technologies (see our Cookie Policy).",
          ],
        },
        {
          heading: "3. How We Use Your Information",
          body: [
            "We use collected information to respond to enquiries, provide requested services, process job applications, improve our website, and comply with legal obligations. We do not sell personal data to third parties.",
          ],
        },
        {
          heading: "4. Data Sharing",
          body: [
            "We may share information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality obligations. We may also disclose information where required by law.",
          ],
        },
        {
          heading: "5. Data Retention",
          body: [
            "We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.",
          ],
        },
        {
          heading: "6. Your Rights",
          body: [
            "Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict processing of your personal data. To exercise these rights, contact us at privacy@constructivegroup.az.",
          ],
        },
        {
          heading: "7. Contact Us",
          body: [
            `If you have questions about this Privacy Policy, please contact us at ${siteConfig.email} or write to our headquarters at 28 Nizami Street, Baku AZ1010, Azerbaijan.`,
          ],
        },
      ]}
    />
  );
}
