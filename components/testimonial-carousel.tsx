"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { Locale } from "@/i18n/routing";
import { getLocalized } from "@/lib/types";
import { testimonials } from "@/lib/data/team";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function TestimonialCarousel() {
  const locale = useLocale() as Locale;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  ]);
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="min-w-0 shrink-0 grow-0 basis-full">
              <div className="mx-auto max-w-3xl px-2 text-center">
                <Quote className="mx-auto size-9 text-gold-500" />
                <p className="mt-6 text-xl font-medium leading-relaxed text-white sm:text-2xl text-balance">
                  &ldquo;{getLocalized(testimonial.quote, locale)}&rdquo;
                </p>
                <div className="mt-7">
                  <p className="text-sm font-semibold text-white">{testimonial.author}</p>
                  <p className="mt-0.5 text-xs text-white/55">
                    {getLocalized(testimonial.role, locale)}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          aria-label="Previous"
          onClick={() => emblaApi?.scrollPrev()}
          className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold-500 hover:text-gold-400 cursor-pointer"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.author}
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                selected === index ? "w-6 bg-gold-500" : "w-1.5 bg-white/25",
              )}
            />
          ))}
        </div>
        <button
          aria-label="Next"
          onClick={() => emblaApi?.scrollNext()}
          className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold-500 hover:text-gold-400 cursor-pointer"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
