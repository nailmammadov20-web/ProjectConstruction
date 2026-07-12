import { AdminPageHeader } from "@/components/admin/page-header";
import { NewsForm } from "@/components/admin/news-form";
import { createArticle } from "@/app/admin/actions/news";

export default function NewArticlePage() {
  return (
    <div>
      <AdminPageHeader title="Yeni məqalə" description="Yeni xəbər məqaləsi əlavə edin" />
      <NewsForm action={createArticle} />
    </div>
  );
}
