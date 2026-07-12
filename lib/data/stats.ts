import type { StatItem } from "@/lib/types";

export const stats: StatItem[] = [
  { key: "experience", value: 22, suffix: "+" },
  { key: "projects", value: 350, suffix: "+" },
  { key: "countries", value: 18, suffix: "+" },
  { key: "engineers", value: 120, suffix: "+" },
];

export const safetyStats = [
  { value: 0.15, suffix: "", label: { en: "LTIFR per 200,000 hours" } },
  { value: 4.2, suffix: "M+", label: { en: "Safe man-hours logged (2023)" } },
  { value: 100, suffix: "%", label: { en: "Sites ISO 45001 audited" } },
  { value: 0, suffix: "", label: { en: "Fatalities, group-wide, 5-year record" } },
];

export const achievements = [
  { year: "2024", title: { en: "Caucasus Construction Excellence Award — Residential" } },
  { year: "2023", title: { en: "RoSPA Gold Award for Occupational Safety" } },
  { year: "2022", title: { en: "Regional Infrastructure Project of the Year" } },
  { year: "2021", title: { en: "Top 3 Contractor, Caucasus Region — Construction Weekly" } },
];

export const companyTimeline = [
  { year: "2004", title: { en: "Company Founded" }, body: { en: "Constructivegroup.az established in Baku with a team of 12 engineers, focused on commercial fit-out projects." } },
  { year: "2009", title: { en: "First International Project" }, body: { en: "Expanded operations into Georgia with our first cross-border infrastructure contract." } },
  { year: "2013", title: { en: "ISO 9001 Certification" }, body: { en: "Achieved group-wide quality management certification, formalising our project controls framework." } },
  { year: "2016", title: { en: "100th Project Milestone" }, body: { en: "Delivered our 100th completed project, spanning five countries." } },
  { year: "2019", title: { en: "Digital Construction Division Launched" }, body: { en: "Established a dedicated BIM, drone survey and digital twin practice." } },
  { year: "2022", title: { en: "ISO 45001 Group Certification" }, body: { en: "Formalised our zero-harm safety culture under an externally audited management system." } },
  { year: "2024", title: { en: "350+ Projects, 18 Countries" }, body: { en: "Reached 350+ completed projects across 18 countries, with over 120 engineers and specialists on staff." } },
];
