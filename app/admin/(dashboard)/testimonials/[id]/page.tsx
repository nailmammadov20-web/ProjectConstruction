import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { updateTestimonial } from "@/app/admin/actions/testimonials";
import type { Testimonial, ImageAsset, LocalizedText } from "@/lib/types";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.testimonial.findUnique({ where: { id } });
  if (!row) notFound();

  const testimonial: Testimonial = {
    quote: row.quote as unknown as LocalizedText,
    author: row.author,
    role: row.role as unknown as LocalizedText,
    company: row.company,
    photo: (row.photo as unknown as ImageAsset | null) ?? undefined,
  };

  return (
    <div>
      <AdminPageHeader title="Rəyi redaktə et" description={row.author} />
      <TestimonialForm testimonial={testimonial} action={updateTestimonial.bind(null, id)} />
    </div>
  );
}
