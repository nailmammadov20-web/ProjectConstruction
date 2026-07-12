import { getTranslations } from "next-intl/server";
import { SectionTitle } from "@/components/section-title";
import { PartnerCarousel } from "@/components/partner-carousel";
import { getPartners } from "@/lib/repo/team";

export async function PartnersSection() {
  const t = await getTranslations("home");
  const partners = await getPartners();

  return (
    <section className="section-padding !py-16 border-y border-border">
      <div className="container-wide">
        <SectionTitle eyebrow={t("partnersEyebrow")} title={t("partnersTitle")} align="center" className="mx-auto" />
        <div className="mt-12">
          <PartnerCarousel partners={partners} />
        </div>
      </div>
    </section>
  );
}
