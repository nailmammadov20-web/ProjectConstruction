import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteOffice } from "@/app/admin/actions/offices";
import { Pencil, Star } from "lucide-react";

export default async function AdminOfficesPage() {
  const offices = await prisma.office.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Ofislər" description={`${offices.length} ofis`} newHref="/admin/offices/new" newLabel="Yeni ofis" />

      <div className="overflow-hidden rounded-sm border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Şəhər</th>
              <th className="px-5 py-3 font-semibold">E-poçt</th>
              <th className="px-5 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {offices.map((office) => {
              const city = (office.city as { en?: string })?.en ?? "";
              return (
                <tr key={office.id}>
                  <td className="px-5 py-3.5 font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      {office.isHeadquarters && <Star className="size-3.5 fill-gold-500 text-gold-500" />}
                      {city}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{office.email}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/offices/${office.id}`}
                        className="flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <DeleteButton action={deleteOffice.bind(null, office.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {offices.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Hələ ofis yoxdur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
