import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTestimonial } from "@/app/admin/actions/testimonials";
import { Pencil } from "lucide-react";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminPageHeader
        title="Müştəri Rəyləri"
        description={`${testimonials.length} rəy`}
        newHref="/admin/testimonials/new"
        newLabel="Yeni rəy"
      />

      <div className="overflow-hidden rounded-sm border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Müəllif</th>
              <th className="px-5 py-3 font-semibold">Şirkət</th>
              <th className="px-5 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td className="px-5 py-3.5 font-medium text-foreground">{testimonial.author}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{testimonial.company}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/testimonials/${testimonial.id}`}
                      className="flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <DeleteButton action={deleteTestimonial.bind(null, testimonial.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Hələ rəy yoxdur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
