import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/db";
import { services } from "../lib/data/services";
import { projects } from "../lib/data/projects";
import { newsArticles } from "../lib/data/news";
import { leadershipTeam, certificates, partners, jobOpenings, testimonials, offices } from "../lib/data/team";
import { achievements, companyTimeline } from "../lib/data/stats";
import { placeholderImage } from "../lib/images";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@constructivegroup.az";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash },
  });
  console.log(`Admin user ready: ${adminEmail}`);

  for (const [index, service] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        slug: service.slug,
        icon: service.icon,
        title: service.title,
        shortDescription: service.shortDescription,
        heroImage: service.heroImage,
        gallery: service.gallery,
        description: service.description,
        benefits: service.benefits,
        process: service.process,
        faq: service.faq,
        relatedServiceSlugs: service.relatedServiceSlugs,
        order: index,
      },
    });
  }
  console.log(`Seeded ${services.length} services`);

  for (const [index, project] of projects.entries()) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        slug: project.slug,
        title: project.title,
        sector: project.sector,
        location: project.location,
        client: project.client,
        area: project.area,
        completionDate: project.completionDate,
        scope: project.scope,
        summary: project.summary,
        heroImage: project.heroImage,
        gallery: project.gallery,
        beforeImage: project.beforeImage ?? undefined,
        afterImage: project.afterImage ?? undefined,
        overview: project.overview,
        challenges: project.challenges,
        solutions: project.solutions,
        technologies: project.technologies,
        timeline: project.timeline,
        featured: project.featured,
        relatedProjectSlugs: project.relatedProjectSlugs,
        order: index,
      },
    });
  }
  console.log(`Seeded ${projects.length} projects`);

  for (const article of newsArticles) {
    await prisma.newsArticle.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        slug: article.slug,
        category: article.category,
        title: article.title,
        excerpt: article.excerpt,
        coverImage: article.coverImage,
        publishedAt: new Date(article.publishedAt),
        readingMinutes: article.readingMinutes,
        author: article.author,
        authorRole: article.authorRole,
        featured: article.featured,
        body: article.body,
      },
    });
  }
  console.log(`Seeded ${newsArticles.length} news articles`);

  for (const [index, member] of leadershipTeam.entries()) {
    await prisma.teamMember.upsert({
      where: { slug: member.slug },
      update: {},
      create: {
        slug: member.slug,
        name: member.name,
        role: member.role,
        photo: member.photo,
        bio: member.bio ?? undefined,
        order: index,
      },
    });
  }
  console.log(`Seeded ${leadershipTeam.length} team members`);

  for (const [index, cert] of certificates.entries()) {
    await prisma.certificate.upsert({
      where: { code: cert.code },
      update: {},
      create: {
        code: cert.code,
        title: cert.title,
        issuer: cert.issuer,
        year: cert.year,
        order: index,
      },
    });
  }
  console.log(`Seeded ${certificates.length} certificates`);

  for (const [index, partner] of partners.entries()) {
    const existing = await prisma.partner.findFirst({ where: { name: partner.name } });
    if (!existing) {
      await prisma.partner.create({
        data: { name: partner.name, logo: partner.logo ?? undefined, order: index },
      });
    }
  }
  console.log(`Seeded ${partners.length} partners`);

  for (const [index, job] of jobOpenings.entries()) {
    await prisma.jobOpening.upsert({
      where: { slug: job.slug },
      update: {},
      create: {
        slug: job.slug,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        summary: job.summary,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        experienceLevel: job.experienceLevel,
        isOpen: true,
        order: index,
      },
    });
  }
  console.log(`Seeded ${jobOpenings.length} job openings`);

  for (const [index, testimonial] of testimonials.entries()) {
    const existing = await prisma.testimonial.findFirst({ where: { author: testimonial.author } });
    if (!existing) {
      await prisma.testimonial.create({
        data: {
          quote: testimonial.quote,
          author: testimonial.author,
          role: testimonial.role,
          company: testimonial.company,
          photo: testimonial.photo ?? undefined,
          order: index,
        },
      });
    }
  }
  console.log(`Seeded ${testimonials.length} testimonials`);

  for (const [index, office] of offices.entries()) {
    const existing = await prisma.office.findFirst({ where: { email: office.email } });
    if (!existing) {
      await prisma.office.create({
        data: {
          city: office.city,
          country: office.country,
          address: office.address,
          phone: office.phone,
          email: office.email,
          isHeadquarters: office.isHeadquarters,
          mapEmbedUrl: office.mapEmbedUrl,
          order: index,
        },
      });
    }
  }
  console.log(`Seeded ${offices.length} offices`);

  const ceo = leadershipTeam[0];
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      heroEyebrow: {
        en: "Construction · Engineering · Project Management",
        az: "Tikinti · Mühəndislik · Layihə İdarəetməsi",
        ru: "Строительство · Инжиниринг · Управление проектами",
      },
      heroTitle: {
        en: "Building the Infrastructure of Tomorrow",
        az: "Sabahın İnfrastrukturunu Qururuq",
        ru: "Строим Инфраструктуру Будущего",
      },
      heroSubtitle: {
        en: "Constructivegroup.az delivers world-class construction, engineering and project management services across commercial, industrial and public infrastructure — engineered to international standards, built to last generations.",
        az: "Constructivegroup.az kommersiya, sənaye və dövlət infrastrukturunda beynəlxalq standartlara uyğun tikinti, mühəndislik və layihə idarəetmə xidmətləri təqdim edir.",
        ru: "Constructivegroup.az предоставляет услуги мирового класса в области строительства, инжиниринга и управления проектами в коммерческой, промышленной и государственной инфраструктуре — по международным стандартам, на десятилетия вперёд.",
      },
      heroVideoUrl: null,
      heroImage: placeholderImage("hero-drone-construction", 2400, 1500, "Aerial drone view of an active construction site at golden hour"),
      statExperience: 22,
      statCountries: 18,
      statEngineers: 120,
      aboutIntro: {
        en: "We are an international construction, engineering and project management group delivering complex, high-value projects across the Caucasus, Central Asia, the Middle East and Europe.",
        az: "Biz Qafqaz, Mərkəzi Asiya, Yaxın Şərq və Avropada mürəkkəb, yüksək dəyərli layihələr həyata keçirən beynəlxalq tikinti, mühəndislik və layihə idarəetmə qrupuyuq.",
        ru: "Мы — международная группа компаний в сфере строительства, инжиниринга и управления проектами, реализующая сложные и высокоценные проекты на Кавказе, в Центральной Азии, на Ближнем Востоке и в Европе.",
      },
      aboutTeaserTitle: {
        en: "Two decades of engineering excellence, delivered on every continent",
        az: "Hər qitədə iyirmi ilə yaxın mühəndislik təcrübəsi",
        ru: "Два десятилетия инженерного совершенства на всех континентах",
      },
      aboutHighlights: [
        {
          en: "22+ years delivering complex, high-value projects",
          az: "22+ il mürəkkəb, yüksək dəyərli layihələrin icrası",
          ru: "22+ года реализации сложных и высокоценных проектов",
        },
        {
          en: "ISO 9001, 14001 & 45001 certified operations",
          az: "ISO 9001, 14001 və 45001 sertifikatlı əməliyyatlar",
          ru: "Сертифицированная деятельность по ISO 9001, 14001 и 45001",
        },
        {
          en: "120+ engineers and specialists across 18 countries",
          az: "18 ölkədə 120+ mühəndis və mütəxəssis",
          ru: "120+ инженеров и специалистов в 18 странах",
        },
      ],
      aboutTeaserImage1: placeholderImage("about-teaser-1", 900, 1100, "Engineers reviewing plans on an active site"),
      aboutTeaserImage2: placeholderImage("about-teaser-2", 700, 620, "Close-up of structural steel detailing"),
      missionText: {
        en: "To deliver the built environment our clients envision — safely, on schedule, and to the highest international standards of engineering quality.",
        az: "Müştərilərimizin gördüyü tikili mühiti təhlükəsiz, vaxtında və ən yüksək beynəlxalq mühəndislik keyfiyyəti standartlarına uyğun təqdim etmək.",
        ru: "Воплощать видение наших клиентов в реальность — безопасно, в срок и по высочайшим международным стандартам инженерного качества.",
      },
      visionText: {
        en: "To be the most trusted construction and engineering partner across the regions we serve, recognised for integrity, innovation and technical excellence.",
        az: "Xidmət göstərdiyimiz regionlarda dürüstlük, innovasiya və texniki mükəmməllik ilə tanınan ən etibarlı tikinti və mühəndislik tərəfdaşı olmaq.",
        ru: "Быть самым надёжным партнёром в области строительства и инжиниринга в регионах присутствия, известным своей честностью, инновациями и техническим совершенством.",
      },
      ceoName: ceo.name,
      ceoRole: {
        en: "Chief Executive Officer",
        az: "Baş İcraçı Direktor",
        ru: "Генеральный директор",
      },
      ceoQuote: {
        en: "Every project we deliver carries our name and our word. In 22 years, we have never compromised on safety or quality to save a schedule — and that discipline is exactly why clients trust us with their most complex work.",
        az: "Təhvil verdiyimiz hər layihə bizim adımızı və sözümüzü daşıyır. 22 il ərzində cədvələ görə heç vaxt təhlükəsizlik və ya keyfiyyətdən güzəştə getməmişik — və məhz bu intizam sayəsində müştərilər ən mürəkkəb işlərini bizə etibar edir.",
        ru: "Каждый реализованный нами проект несёт наше имя и наше слово. За 22 года мы никогда не жертвовали безопасностью или качеством ради сроков — и именно эта дисциплина является причиной того, что клиенты доверяют нам свои самые сложные проекты.",
      },
      ceoPhoto: ceo.photo,
      achievements,
      companyTimeline,
      hseBody: {
        en: "We are committed to a zero-harm workplace, achieved through rigorous risk management, continuous training and a culture where every employee has the authority to stop unsafe work.",
        az: "Biz sərt risk idarəetməsi, davamlı təlim və hər bir işçinin təhlükəsiz olmayan işi dayandırmaq səlahiyyətinə malik olduğu bir mədəniyyət vasitəsilə sıfır-zərər iş yerinə sadiqik.",
        ru: "Мы стремимся к рабочему месту с нулевым уровнем травматизма, достигаемому за счёт строгого управления рисками, постоянного обучения и культуры, в которой каждый сотрудник вправе остановить небезопасную работу.",
      },
      qualityPolicyBody: {
        en: "Every project is delivered under a certified quality management system, with independent audits, structured inspection and test plans, and continuous improvement.",
        az: "Hər layihə sertifikatlaşdırılmış keyfiyyət idarəetmə sistemi altında, müstəqil auditlər, strukturlaşdırılmış yoxlama və sınaq planları və davamlı təkmilləşdirmə ilə həyata keçirilir.",
        ru: "Каждый проект реализуется в рамках сертифицированной системы менеджмента качества с независимыми аудитами, структурированными планами контроля и испытаний, а также постоянным совершенствованием.",
      },
      environmentBody: {
        en: "We minimise environmental impact through responsible resource management, waste reduction and sustainable construction methods across all operations.",
        az: "Biz bütün əməliyyatlarımızda məsuliyyətli resurs idarəetməsi, tullantıların azaldılması və davamlı tikinti metodları vasitəsilə ətraf mühitə təsiri minimuma endiririk.",
        ru: "Мы минимизируем воздействие на окружающую среду за счёт ответственного управления ресурсами, сокращения отходов и устойчивых методов строительства во всех наших операциях.",
      },
      qualityTeaserTitle: {
        en: "Certified. Audited. Uncompromising.",
        az: "Sertifikatlaşdırılmış. Auditdən keçmiş. Güzəştsiz.",
        ru: "Сертифицировано. Проверено. Без компромиссов.",
      },
      qualityTeaserBody: {
        en: "Our integrated management systems are certified to ISO 9001, ISO 14001 and ISO 45001, underpinned by a zero-harm safety culture.",
        az: "İnteqrasiya olunmuş idarəetmə sistemlərimiz ISO 9001, ISO 14001 və ISO 45001 standartlarına uyğun sertifikatlaşdırılıb və sıfır zərər təhlükəsizlik mədəniyyəti ilə dəstəklənir.",
        ru: "Наши интегрированные системы менеджмента сертифицированы по ISO 9001, ISO 14001 и ISO 45001 и подкреплены культурой нулевого травматизма.",
      },
      qualityTeaserImage: placeholderImage("quality-teaser", 1400, 1000, "Safety officer inspecting a site with a checklist"),
      safetyLtifr: 0.15,
      safetyManHours: 4.2,
      safetyAuditedPct: 100,
      safetyFatalities: 0,
    },
  });
  console.log("Site settings ready");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
