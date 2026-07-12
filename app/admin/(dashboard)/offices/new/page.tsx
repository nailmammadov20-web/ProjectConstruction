import { AdminPageHeader } from "@/components/admin/page-header";
import { OfficeForm } from "@/components/admin/office-form";
import { createOffice } from "@/app/admin/actions/offices";

export default function NewOfficePage() {
  return (
    <div>
      <AdminPageHeader title="Yeni ofis" description="Yeni ofis əlavə edin" />
      <OfficeForm action={createOffice} />
    </div>
  );
}
