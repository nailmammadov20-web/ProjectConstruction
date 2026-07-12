import { AdminPageHeader } from "@/components/admin/page-header";
import { CareerForm } from "@/components/admin/career-form";
import { createJobOpening } from "@/app/admin/actions/careers";

export default function NewJobOpeningPage() {
  return (
    <div>
      <AdminPageHeader title="Yeni vakansiya" description="Yeni açıq vakansiya əlavə edin" />
      <CareerForm action={createJobOpening} />
    </div>
  );
}
