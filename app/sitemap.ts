import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { getServices } from "@/lib/repo/services";
import { getProjects } from "@/lib/repo/projects";
import { getNewsArticles } from "@/lib/repo/news";

const staticRoutes = [
  "",
  "/about",
  "/process",
  "/quality-safety",
  "/services",
  "/projects",
  "/news",
  "/careers",
  "/contact",
  "/privacy-policy",
  "/cookies",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, newsArticles] = await Promise.all([
    getServices(),
    getProjects(),
    getNewsArticles(),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : 0.7,
      });
    }
    for (const service of services) {
      entries.push({
        url: `${siteConfig.url}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const project of projects) {
      entries.push({
        url: `${siteConfig.url}/${locale}/projects/${project.slug}`,
        lastModified: new Date(project.completionDate),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const article of newsArticles) {
      entries.push({
        url: `${siteConfig.url}/${locale}/news/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
