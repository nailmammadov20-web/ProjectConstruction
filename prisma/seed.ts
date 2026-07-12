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
      heroEyebrow: { en: "Construction · Engineering · Project Management" },
      heroTitle: { en: "Building the Infrastructure of Tomorrow" },
      heroSubtitle: {
        en: "Constructivegroup.az delivers world-class construction, engineering and project management services across commercial, industrial and public infrastructure — engineered to international standards, built to last generations.",
      },
      heroVideoUrl: null,
      heroImage: placeholderImage("hero-drone-construction", 2400, 1500, "Aerial drone view of an active construction site at golden hour"),
      statExperience: 22,
      statProjects: 350,
      statCountries: 18,
      statEngineers: 120,
      aboutIntro: {
        en: "We are an international construction, engineering and project management group delivering complex, high-value projects across the Caucasus, Central Asia, the Middle East and Europe.",
      },
      missionText: {
        en: "To deliver the built environment our clients envision — safely, on schedule, and to the highest international standards of engineering quality.",
      },
      visionText: {
        en: "To be the most trusted construction and engineering partner across the regions we serve, recognised for integrity, innovation and technical excellence.",
      },
      ceoName: ceo.name,
      ceoRole: ceo.role,
      ceoQuote: {
        en: "Every project we deliver carries our name and our word. In 22 years, we have never compromised on safety or quality to save a schedule — and that discipline is exactly why clients trust us with their most complex work.",
      },
      ceoPhoto: ceo.photo,
      achievements,
      companyTimeline,
      hseBody: {
        en: "We are committed to a zero-harm workplace, achieved through rigorous risk management, continuous training and a culture where every employee has the authority to stop unsafe work.",
      },
      qualityPolicyBody: {
        en: "Every project is delivered under a certified quality management system, with independent audits, structured inspection and test plans, and continuous improvement.",
      },
      environmentBody: {
        en: "We minimise environmental impact through responsible resource management, waste reduction and sustainable construction methods across all operations.",
      },
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
