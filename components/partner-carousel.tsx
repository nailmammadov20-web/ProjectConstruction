import type { Partner } from "@/lib/types";

export function PartnerCarousel({ partners }: { partners: Partner[] }) {
  const loopPartners = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee items-stretch gap-4 hover:[animation-play-state:paused]">
        {loopPartners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex h-20 w-56 shrink-0 items-center justify-center rounded-sm border border-border bg-card px-6 text-center text-sm font-semibold tracking-wide text-muted-foreground grayscale transition-all duration-300 hover:grayscale-0 hover:text-navy-900 hover:border-gold-500/50 dark:hover:text-white"
          >
            {partner.name}
          </div>
        ))}
      </div>
    </div>
  );
}
