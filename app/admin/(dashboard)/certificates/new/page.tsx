import { AdminPageHeader } from "@/components/admin/page-header";
import { CertificateForm } from "@/components/admin/certificate-form";
import { createCertificate } from "@/app/admin/actions/certificates";

export default function NewCertificatePage() {
  return (
    <div>
      <AdminPageHeader title="Yeni sertifikat" description="Yeni sertifikat əlavə edin" />
      <CertificateForm action={createCertificate} />
    </div>
  );
}
