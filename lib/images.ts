import type { ImageAsset } from "@/lib/types";

/**
 * Deterministic placeholder photography until real brand assets are supplied.
 * Swap by replacing `src` with real CDN/CMS URLs — width/height/alt stay stable.
 */
export function placeholderImage(
  seed: string,
  width: number,
  height: number,
  alt: string,
): ImageAsset {
  return {
    src: `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`,
    alt,
    width,
    height,
  };
}
