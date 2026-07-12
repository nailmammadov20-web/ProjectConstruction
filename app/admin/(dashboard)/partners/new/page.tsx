import { AdminPageHeader } from "@/components/admin/page-header";
import { PartnerForm } from "@/components/admin/partner-form";
import { createPartner } from "@/app/admin/actions/partners";

export default function NewPartnerPage() {
  return (
    <div>
      <AdminPageHeader title="Yeni tərəfdaş" description="Yeni tərəfdaş əlavə edin" />
      <PartnerForm action={createPartner} />
    </div>
  );
}
