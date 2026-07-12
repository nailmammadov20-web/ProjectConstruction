import Image from "next/image";
import type { ImageAsset } from "@/lib/types";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  body,
  image,
  breadcrumbs,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  image: ImageAsset;
  breadcrumbs: BreadcrumbItem[];
  compact?: boolean;
}) {
  return (
    <section
      className={`relative flex items-end overflow-hidden bg-navy-900 ${
        compact ? "min-h-[46vh]" : "min-h-[58vh]"
      }`}
    >
      <div className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/45" />
      </div>

      <div className="container-wide relative z-10 pb-14 pt-36">
        <Breadcrumbs items={breadcrumbs} theme="dark" />
        {eyebrow && (
          <span className="mb-4 mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
            <span className="h-px w-8 bg-gold-400" />
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl text-3xl font-bold leading-[1.12] text-white text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {body && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
