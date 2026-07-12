import { AdminPageHeader } from "@/components/admin/page-header";
import { ServiceForm } from "@/components/admin/service-form";
import { createService } from "@/app/admin/actions/services";

export default function NewServicePage() {
  return (
    <div>
      <AdminPageHeader title="Yeni xidmət" description="Yeni xidmət əlavə edin" />
      <ServiceForm action={createService} />
    </div>
  );
}
