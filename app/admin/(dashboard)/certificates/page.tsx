import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCertificate } from "@/app/admin/actions/certificates";
import { Pencil } from "lucide-react";

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminPageHeader
        title="Sertifikatlar"
        description={`${certificates.length} sertifikat`}
        newHref="/admin/certificates/new"
        newLabel="Yeni sertifikat"
      />

      <div className="overflow-x-auto rounded-sm border border-border bg-card">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Kod</th>
              <th className="px-5 py-3 font-semibold">Verən qurum</th>
              <th className="px-5 py-3 font-semibold">İl</th>
              <th className="px-5 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {certificates.map((cert) => (
              <tr key={cert.id}>
                <td className="px-5 py-3.5 font-medium text-foreground">{cert.code}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{cert.issuer}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{cert.year}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/certificates/${cert.id}`}
                      className="flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <DeleteButton action={deleteCertificate.bind(null, cert.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {certificates.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Hələ sertifikat yoxdur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
