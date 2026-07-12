import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePartner } from "@/app/admin/actions/partners";
import { Pencil } from "lucide-react";

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Tərəfdaşlar" description={`${partners.length} tərəfdaş`} newHref="/admin/partners/new" newLabel="Yeni tərəfdaş" />

      <div className="overflow-hidden rounded-sm border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Ad</th>
              <th className="px-5 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {partners.map((partner) => (
              <tr key={partner.id}>
                <td className="px-5 py-3.5 font-medium text-foreground">{partner.name}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/partners/${partner.id}`}
                      className="flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <DeleteButton action={deletePartner.bind(null, partner.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {partners.length === 0 && (
              <tr>
                <td colSpan={2} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Hələ tərəfdaş yoxdur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
