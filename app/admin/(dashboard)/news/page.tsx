import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteArticle } from "@/app/admin/actions/news";
import { Pencil, Star } from "lucide-react";

export default async function AdminNewsPage() {
  const articles = await prisma.newsArticle.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <AdminPageHeader title="Xəbərlər" description={`${articles.length} məqalə`} newHref="/admin/news/new" newLabel="Yeni məqalə" />

      <div className="overflow-hidden rounded-sm border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Başlıq</th>
              <th className="px-5 py-3 font-semibold">Kateqoriya</th>
              <th className="px-5 py-3 font-semibold">Tarix</th>
              <th className="px-5 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {articles.map((article) => {
              const title = (article.title as { en?: string })?.en ?? article.slug;
              return (
                <tr key={article.id}>
                  <td className="px-5 py-3.5 font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      {article.featured && <Star className="size-3.5 fill-gold-500 text-gold-500" />}
                      {title}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">/{article.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{article.category}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {article.publishedAt.toISOString().slice(0, 10)}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/news/${article.id}`}
                        className="flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <DeleteButton action={deleteArticle.bind(null, article.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {articles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Hələ məqalə yoxdur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
