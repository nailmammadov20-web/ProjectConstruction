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
  {
    year: "2024",
    title: {
      en: "Caucasus Construction Excellence Award — Residential",
      az: "Qafqaz Tikintidə Mükəmməllik Mükafatı — Yaşayış",
      ru: "Премия за превосходство в строительстве Кавказа — Жилые объекты",
    },
  },
  {
    year: "2023",
    title: {
      en: "RoSPA Gold Award for Occupational Safety",
      az: "Əməyin Təhlükəsizliyi üzrə RoSPA Qızıl Mükafatı",
      ru: "Золотая награда RoSPA за охрану труда",
    },
  },
  {
    year: "2022",
    title: {
      en: "Regional Infrastructure Project of the Year",
      az: "İlin Regional İnfrastruktur Layihəsi",
      ru: "Региональный инфраструктурный проект года",
    },
  },
  {
    year: "2021",
    title: {
      en: "Top 3 Contractor, Caucasus Region — Construction Weekly",
      az: "Qafqaz Regionunda İlk 3 Podratçı — Construction Weekly",
      ru: "Топ-3 подрядчика Кавказского региона — Construction Weekly",
    },
  },
];

export const companyTimeline = [
  {
    year: "2004",
    title: { en: "Company Founded", az: "Şirkət Yaradıldı", ru: "Основание компании" },
    body: {
      en: "Constructivegroup.az established in Baku with a team of 12 engineers, focused on commercial fit-out projects.",
      az: "Constructivegroup.az Bakıda 12 mühəndisdən ibarət komanda ilə, kommersiya təmir-tikinti layihələrinə fokuslanaraq quruldu.",
      ru: "Constructivegroup.az была основана в Баку командой из 12 инженеров, специализирующейся на коммерческих отделочных проектах.",
    },
  },
  {
    year: "2009",
    title: { en: "First International Project", az: "İlk Beynəlxalq Layihə", ru: "Первый международный проект" },
    body: {
      en: "Expanded operations into Georgia with our first cross-border infrastructure contract.",
      az: "Gürcüstanda ilk sərhədlərarası infrastruktur müqaviləsi ilə fəaliyyətimizi genişləndirdik.",
      ru: "Расширили деятельность на Грузию, заключив первый трансграничный инфраструктурный контракт.",
    },
  },
  {
    year: "2013",
    title: { en: "ISO 9001 Certification", az: "ISO 9001 Sertifikatı", ru: "Сертификация ISO 9001" },
    body: {
      en: "Achieved group-wide quality management certification, formalising our project controls framework.",
      az: "Layihə nəzarəti çərçivəmizi rəsmiləşdirərək qrup səviyyəsində keyfiyyət idarəetmə sertifikatı əldə etdik.",
      ru: "Получили сертификат системы менеджмента качества на уровне группы, формализовав систему контроля проектов.",
    },
  },
  {
    year: "2016",
    title: { en: "100th Project Milestone", az: "100-cü Layihə Mərhələsi", ru: "100-й реализованный проект" },
    body: {
      en: "Delivered our 100th completed project, spanning five countries.",
      az: "Beş ölkəni əhatə edən 100-cü tamamlanmış layihəmizi təhvil verdik.",
      ru: "Сдали свой 100-й завершённый проект, охватывающий пять стран.",
    },
  },
  {
    year: "2019",
    title: {
      en: "Digital Construction Division Launched",
      az: "Rəqəmsal Tikinti Bölməsi Yaradıldı",
      ru: "Запуск отдела цифрового строительства",
    },
    body: {
      en: "Established a dedicated BIM, drone survey and digital twin practice.",
      az: "Xüsusi BIM, dron monitorinqi və rəqəmsal əkiz təcrübəsi yaratdıq.",
      ru: "Создали специализированную практику BIM, дронового обследования и цифровых двойников.",
    },
  },
  {
    year: "2022",
    title: { en: "ISO 45001 Group Certification", az: "ISO 45001 Qrup Sertifikatı", ru: "Групповая сертификация ISO 45001" },
    body: {
      en: "Formalised our zero-harm safety culture under an externally audited management system.",
      az: "Xarici auditə tabe olan idarəetmə sistemi altında sıfır-zərər təhlükəsizlik mədəniyyətimizi rəsmiləşdirdik.",
      ru: "Формализовали культуру безопасности с нулевым травматизмом в рамках системы управления с внешним аудитом.",
    },
  },
  {
    year: "2024",
    title: { en: "350+ Projects, 18 Countries", az: "350+ Layihə, 18 Ölkə", ru: "350+ проектов, 18 стран" },
    body: {
      en: "Reached 350+ completed projects across 18 countries, with over 120 engineers and specialists on staff.",
      az: "18 ölkədə 350-dən çox tamamlanmış layihəyə çatdıq, heyətimizdə 120-dən çox mühəndis və mütəxəssis var.",
      ru: "Достигли отметки в 350+ завершённых проектов в 18 странах, в штате более 120 инженеров и специалистов.",
    },
  },
];
