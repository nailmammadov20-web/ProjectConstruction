import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { NewsForm } from "@/components/admin/news-form";
import { updateArticle } from "@/app/admin/actions/news";
import type { NewsArticle, NewsCategory, ImageAsset, LocalizedText } from "@/lib/types";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.newsArticle.findUnique({ where: { id } });
  if (!row) notFound();

  const article: NewsArticle = {
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

  return (
    <div>
      <AdminPageHeader title="Məqaləni redaktə et" description={row.slug} />
      <NewsForm article={article} action={updateArticle.bind(null, id)} />
    </div>
  );
}
