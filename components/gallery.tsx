"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ImageAsset } from "@/lib/types";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

export function Gallery({ images }: { images: ImageAsset[] }) {
  const [open, setOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);

  function openAt(index: number) {
    setStartIndex(index);
    setOpen(true);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src + index}
            onClick={() => openAt(index)}
            className={`group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-sm ${
              index === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 aspect-square" : ""
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-navy-950/0 opacity-0 transition-all duration-300 group-hover:bg-navy-950/30 group-hover:opacity-100">
              <Expand className="size-6 text-white" />
            </div>
          </button>
        ))}
      </div>

      {open && (
        <LightboxDialog
          images={images}
          startIndex={startIndex}
          onOpenChange={setOpen}
        />
      )}
    </>
  );
}

function LightboxDialog({
  images,
  startIndex,
  onOpenChange,
}: {
  images: ImageAsset[];
  startIndex: number;
  onOpenChange: (open: boolean) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex, loop: true });

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-5xl border-none bg-navy-950 p-0 sm:rounded-sm"
      >
        <DialogTitle className="sr-only">Image gallery</DialogTitle>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div key={image.src + index} className="relative aspect-video min-w-0 shrink-0 grow-0 basis-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          aria-label="Previous image"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 cursor-pointer"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          aria-label="Next image"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 cursor-pointer"
        >
          <ChevronRight className="size-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
