import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { OfficeForm } from "@/components/admin/office-form";
import { updateOffice } from "@/app/admin/actions/offices";
import type { Office, LocalizedText } from "@/lib/types";

export default async function EditOfficePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.office.findUnique({ where: { id } });
  if (!row) notFound();

  const office: Office = {
    city: row.city as unknown as LocalizedText,
    country: row.country as unknown as LocalizedText,
    address: row.address as unknown as LocalizedText,
    phone: row.phone,
    email: row.email,
    isHeadquarters: row.isHeadquarters,
    mapEmbedUrl: row.mapEmbedUrl,
  };

  return (
    <div>
      <AdminPageHeader title="Ofisi redaktə et" description={row.email} />
      <OfficeForm office={office} action={updateOffice.bind(null, id)} />
    </div>
  );
}
