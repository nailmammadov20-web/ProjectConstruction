import { AdminPageHeader } from "@/components/admin/page-header";
import { ServiceForm } from "@/components/admin/service-form";
import { createService } from "@/app/admin/actions/services";
import { getServices } from "@/lib/repo/services";
import { getLocalized } from "@/lib/types";

export default async function NewServicePage() {
  const services = await getServices();
  const relatedOptions = services.map((s) => ({ slug: s.slug, title: getLocalized(s.title, "en") }));

  return (
    <div>
      <AdminPageHeader title="Yeni xidmət" description="Yeni xidmət əlavə edin" />
      <ServiceForm action={createService} relatedOptions={relatedOptions} />
    </div>
  );
}
