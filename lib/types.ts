import type { Locale } from "@/i18n/routing";

export type { Locale };

/**
 * Fields authored per-locale. `en` is required; `az`/`ru` are optional so
 * a future CMS can publish partial translations without breaking builds —
 * getLocalized() falls back to `en` when a locale is missing.
 */
export type LocalizedText = {
  en: string;
  az?: string;
  ru?: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Sector =
  | "commercial"
  | "industrial"
  | "residential"
  | "infrastructure"
  | "healthcare"
  | "hospitality"
  | "government"
  | "education";

export type ServiceSummary = {
  slug: string;
  icon: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
};

export type ServiceFAQ = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type Service = ServiceSummary & {
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  description: LocalizedText[];
  benefits: LocalizedText[];
  process: LocalizedText[];
  faq: ServiceFAQ[];
  relatedServiceSlugs: string[];
};

export type ProjectMilestone = {
  date: LocalizedText;
  label: LocalizedText;
};

export type Project = {
  slug: string;
  title: LocalizedText;
  sector: Sector;
  location: LocalizedText;
  client: LocalizedText;
  area: string;
  completionDate: string;
  scope: LocalizedText;
  summary: LocalizedText;
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  beforeImage?: ImageAsset;
  afterImage?: ImageAsset;
  overview: LocalizedText[];
  challenges: LocalizedText[];
  solutions: LocalizedText[];
  technologies: string[];
  timeline: ProjectMilestone[];
  featured: boolean;
  relatedProjectSlugs: string[];
};

export type NewsCategory =
  | "company"
  | "projects"
  | "industry"
  | "sustainability"
  | "awards";

export type NewsArticle = {
  slug: string;
  category: NewsCategory;
  title: LocalizedText;
  excerpt: LocalizedText;
  coverImage: ImageAsset;
  publishedAt: string;
  readingMinutes: number;
  author: string;
  authorRole: LocalizedText;
  featured: boolean;
  body: LocalizedText[];
};

export type TeamMember = {
  slug: string;
  name: string;
  role: LocalizedText;
  photo: ImageAsset;
  bio?: LocalizedText;
};

export type Certificate = {
  code: string;
  title: LocalizedText;
  issuer: string;
  year: string;
};

export type Partner = {
  name: string;
  logo?: ImageAsset;
};

export type Testimonial = {
  quote: LocalizedText;
  author: string;
  role: LocalizedText;
  company: string;
  photo?: ImageAsset;
};

export type JobOpening = {
  slug: string;
  title: LocalizedText;
  department: string;
  location: LocalizedText;
  type: LocalizedText;
  summary: LocalizedText;
  responsibilities: LocalizedText[];
  requirements: LocalizedText[];
  experienceLevel?: LocalizedText;
  applicationDeadline?: string;
};

export type Office = {
  city: LocalizedText;
  country: LocalizedText;
  address: LocalizedText;
  phone: string;
  email: string;
  isHeadquarters: boolean;
  mapEmbedUrl: string;
};

export type StatItem = {
  key: "experience" | "projects" | "countries" | "engineers";
  value: number;
  suffix: string;
};

export type Achievement = {
  year: string;
  title: LocalizedText;
};

export type TimelineEntry = {
  year: string;
  title: LocalizedText;
  body: LocalizedText;
};

export type SafetyStat = {
  value: number;
  suffix: string;
  label: LocalizedText;
};

export type SiteSettings = {
  heroEyebrow: LocalizedText;
  heroTitle: LocalizedText;
  heroSubtitle: LocalizedText;
  heroVideoUrl?: string;
  heroImage: ImageAsset;
  statExperience: number;
  statCountries: number;
  statEngineers: number;
  aboutIntro: LocalizedText;
  aboutTeaserTitle: LocalizedText;
  aboutHighlights: LocalizedText[];
  aboutTeaserImage1: ImageAsset;
  aboutTeaserImage2: ImageAsset;
  missionText: LocalizedText;
  visionText: LocalizedText;
  ceoName: string;
  ceoRole: LocalizedText;
  ceoQuote: LocalizedText;
  ceoPhoto: ImageAsset;
  achievements: Achievement[];
  companyTimeline: TimelineEntry[];
  hseBody: LocalizedText;
  qualityPolicyBody: LocalizedText;
  environmentBody: LocalizedText;
  qualityTeaserTitle: LocalizedText;
  qualityTeaserBody: LocalizedText;
  qualityTeaserImage: ImageAsset;
  safetyLtifr: number;
  safetyManHours: number;
  safetyAuditedPct: number;
  safetyFatalities: number;
};

export function getLocalized(field: LocalizedText, locale: Locale): string {
  return field[locale] ?? field.en;
}
