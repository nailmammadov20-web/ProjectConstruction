import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { CareerForm, type JobOpeningFormValues } from "@/components/admin/career-form";
import { updateJobOpening } from "@/app/admin/actions/careers";
import type { LocalizedText } from "@/lib/types";

export default async function EditJobOpeningPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.jobOpening.findUnique({ where: { id } });
  if (!row) notFound();

  const job: JobOpeningFormValues = {
    slug: row.slug,
    title: row.title as unknown as LocalizedText,
    department: row.department,
    location: row.location as unknown as LocalizedText,
    type: row.type as unknown as LocalizedText,
    summary: row.summary as unknown as LocalizedText,
    isOpen: row.isOpen,
  };

  return (
    <div>
      <AdminPageHeader title="Vakansiyanı redaktə et" description={row.slug} />
      <CareerForm job={job} action={updateJobOpening.bind(null, id)} />
    </div>
  );
}
