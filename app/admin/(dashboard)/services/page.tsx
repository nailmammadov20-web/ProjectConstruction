import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteService } from "@/app/admin/actions/services";
import { Pencil } from "lucide-react";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Xidmətlər" description={`${services.length} xidmət`} newHref="/admin/services/new" newLabel="Yeni xidmət" />

      <div className="overflow-hidden rounded-sm border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Başlıq</th>
              <th className="px-5 py-3 font-semibold">İkon</th>
              <th className="px-5 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {services.map((service) => {
              const title = (service.title as { en?: string })?.en ?? service.slug;
              return (
                <tr key={service.id}>
                  <td className="px-5 py-3.5 font-medium text-foreground">
                    {title}
                    <p className="mt-0.5 text-xs text-muted-foreground">/{service.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{service.icon}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <DeleteButton action={deleteService.bind(null, service.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {services.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Hələ xidmət yoxdur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
