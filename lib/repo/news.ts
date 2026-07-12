import { cache } from "react";
import { prisma } from "@/lib/db";
import type { NewsArticle, NewsCategory, ImageAsset, LocalizedText } from "@/lib/types";
import type { NewsArticle as PrismaNewsArticle } from "@prisma/client";

function toArticle(row: PrismaNewsArticle): NewsArticle {
  return {
    slug: row.slug,
    category: row.category as NewsCategory,
    title: row.title as unknown as LocalizedText,
    excerpt: row.excerpt as unknown as LocalizedText,
    coverImage: row.coverImage as unknown as ImageAsset,
    publishedAt: row.publishedAt.toISOString(),
    readingMinutes: row.readingMinutes,
    author: row.author,
    authorRole: row.authorRole as unknown as LocalizedText,
    featured: row.featured,
    body: row.body as unknown as LocalizedText[],
  };
}

export const getNewsArticles = cache(async (): Promise<NewsArticle[]> => {
  const rows = await prisma.newsArticle.findMany({ orderBy: { publishedAt: "desc" } });
  return rows.map(toArticle);
});

export const getArticleBySlug = cache(async (slug: string): Promise<NewsArticle | undefined> => {
  const row = await prisma.newsArticle.findUnique({ where: { slug } });
  return row ? toArticle(row) : undefined;
});

export function getFeaturedArticle(articles: NewsArticle[]): NewsArticle | undefined {
  return articles.find((article) => article.featured);
}

export function getRelatedArticles(articles: NewsArticle[], article: NewsArticle, limit = 3): NewsArticle[] {
  return articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, limit);
}
