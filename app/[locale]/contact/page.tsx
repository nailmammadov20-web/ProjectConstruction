import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/types";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { OfficesGrid } from "@/components/contact/offices-grid";
import { ContactForm } from "@/components/contact-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { placeholderImage } from "@/lib/images";
import { getOffices } from "@/lib/repo/offices";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { Mail, Phone, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const heroImage = placeholderImage("contact-hero", 1920, 1080, "Reception desk at the Constructivegroup.az headquarters");
  const offices = await getOffices();
  const hq = offices.find((o) => o.isHeadquarters) ?? offices[0];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tCommon("home"), url: siteConfig.url },
          { name: tNav("contact"), url: `${siteConfig.url}/${locale}/contact` },
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("intro")}
        image={heroImage}
        breadcrumbs={[{ label: tNav("contact") }]}
        compact
      />

      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="rounded-sm border border-border bg-card p-8 sm:p-10">
              <h2 className="text-xl font-bold text-foreground">{t("formTitle")}</h2>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <div>
            {hq && (
              <div className="overflow-hidden rounded-sm border border-border">
                <iframe
                  src={hq.mapEmbedUrl}
                  title={t("mapTitle")}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-sm border border-border bg-card p-5">
                <Phone className="size-5 shrink-0 text-gold-500" />
                <div>
                  <p className="text-xs text-muted-foreground">{tNav("contactUs")}</p>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-sm font-semibold text-foreground hover:text-gold-600">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-sm border border-border bg-card p-5">
                <Mail className="size-5 shrink-0 text-gold-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-sm font-semibold text-foreground hover:text-gold-600">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-sm border border-border bg-card p-5 sm:col-span-2">
                <Clock className="size-5 shrink-0 text-gold-500" />
                <div>
                  <p className="text-xs text-muted-foreground">{t("hoursTitle")}</p>
                  <p className="text-sm font-semibold text-foreground">{t("hours")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <SectionTitle eyebrow={t("eyebrow")} title={t("officesTitle")} />
          <div className="mt-14">
            <OfficesGrid offices={offices} />
          </div>
        </div>
      </section>
    </>
  );
}
