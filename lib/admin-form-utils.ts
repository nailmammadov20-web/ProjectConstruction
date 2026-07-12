import type { ImageAsset, LocalizedText } from "@/lib/types";

export function readLocalized(formData: FormData, name: string): LocalizedText {
  const en = String(formData.get(`${name}_en`) ?? "").trim();
  const az = String(formData.get(`${name}_az`) ?? "").trim();
  const ru = String(formData.get(`${name}_ru`) ?? "").trim();
  const result: LocalizedText = { en };
  if (az) result.az = az;
  if (ru) result.ru = ru;
  return result;
}

export function readImage(formData: FormData, name: string): ImageAsset {
  return {
    src: String(formData.get(`${name}_src`) ?? ""),
    alt: String(formData.get(`${name}_alt`) ?? ""),
    width: Number(formData.get(`${name}_width`) ?? 1600) || 1600,
    height: Number(formData.get(`${name}_height`) ?? 1000) || 1000,
  };
}

export function readOptionalImage(formData: FormData, name: string): ImageAsset | undefined {
  const src = String(formData.get(`${name}_src`) ?? "").trim();
  if (!src) return undefined;
  return readImage(formData, name);
}

export class AdminFormError extends Error {}

export function readJson<T>(formData: FormData, name: string, fallback: T): T {
  const raw = String(formData.get(name) ?? "").trim();
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new AdminFormError(`"${name}" sahəsində JSON formatı düzgün deyil.`);
  }
}

export function readStringArray(formData: FormData, name: string): string[] {
  const raw = String(formData.get(name) ?? "").trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
