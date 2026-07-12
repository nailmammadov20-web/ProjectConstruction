import { getTranslations } from "next-intl/server";
import { SectionTitle } from "@/components/section-title";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { getTestimonials } from "@/lib/repo/testimonials";

export async function TestimonialsSection() {
  const t = await getTranslations("home");
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding bg-navy-950">
      <div className="container-wide">
        <SectionTitle
          eyebrow={t("testimonialsEyebrow")}
          title={t("testimonialsTitle")}
          align="center"
          theme="dark"
          className="mx-auto"
        />
        <div className="mt-14">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
