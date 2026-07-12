"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ImageAsset } from "@/lib/types";
import { MoveHorizontal } from "lucide-react";

export function BeforeAfterSlider({
  before,
  after,
}: {
  before: ImageAsset;
  after: ImageAsset;
}) {
  const t = useTranslations("projects");
  const [position, setPosition] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }

  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold-600">
        {t("beforeAfter")}
      </p>
      <div
        ref={containerRef}
        className="relative aspect-video w-full select-none overflow-hidden rounded-sm"
        onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
      >
        <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
        </div>
        <div
          className="absolute inset-y-0 z-10 flex w-0.5 -translate-x-1/2 cursor-ew-resize items-center justify-center bg-white"
          style={{ left: `${position}%` }}
          onMouseDown={() => (dragging.current = true)}
        >
          <div className="flex size-9 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg">
            <MoveHorizontal className="size-4" />
          </div>
        </div>
        <span className="absolute left-3 top-3 rounded-sm bg-navy-950/70 px-2.5 py-1 text-[11px] font-semibold uppercase text-white backdrop-blur-sm">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-sm bg-navy-950/70 px-2.5 py-1 text-[11px] font-semibold uppercase text-white backdrop-blur-sm">
          After
        </span>
      </div>
    </div>
  );
}
