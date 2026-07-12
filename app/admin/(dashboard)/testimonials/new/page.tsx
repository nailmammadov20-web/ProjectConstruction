import { AdminPageHeader } from "@/components/admin/page-header";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { createTestimonial } from "@/app/admin/actions/testimonials";

export default function NewTestimonialPage() {
  return (
    <div>
      <AdminPageHeader title="Yeni rəy" description="Müştəri rəyi əlavə edin" />
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
