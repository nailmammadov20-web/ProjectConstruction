import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/db";
import { services } from "../lib/data/services";
import { projects } from "../lib/data/projects";
import { newsArticles } from "../lib/data/news";
import { leadershipTeam, certificates, partners, jobOpenings } from "../lib/data/team";

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
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
