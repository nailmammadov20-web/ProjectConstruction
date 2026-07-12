import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { CertificateForm } from "@/components/admin/certificate-form";
import { updateCertificate } from "@/app/admin/actions/certificates";
import type { Certificate, LocalizedText } from "@/lib/types";

export default async function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.certificate.findUnique({ where: { id } });
  if (!row) notFound();

  const certificate: Certificate = {
    code: row.code,
    title: row.title as unknown as LocalizedText,
    issuer: row.issuer,
    year: row.year,
  };

  return (
    <div>
      <AdminPageHeader title="Sertifikatı redaktə et" description={row.code} />
      <CertificateForm certificate={certificate} action={updateCertificate.bind(null, id)} />
    </div>
  );
}
