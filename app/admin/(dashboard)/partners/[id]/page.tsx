import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PartnerForm } from "@/components/admin/partner-form";
import { updatePartner } from "@/app/admin/actions/partners";
import type { Partner, ImageAsset } from "@/lib/types";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.partner.findUnique({ where: { id } });
  if (!row) notFound();

  const partner: Partner = {
    name: row.name,
    logo: (row.logo as unknown as ImageAsset | null) ?? undefined,
  };

  return (
    <div>
      <AdminPageHeader title="Tərəfdaşı redaktə et" description={row.name} />
      <PartnerForm partner={partner} action={updatePartner.bind(null, id)} />
    </div>
  );
}
