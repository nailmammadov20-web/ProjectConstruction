import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ServiceForm } from "@/components/admin/service-form";
import { updateService } from "@/app/admin/actions/services";
import type { Service, ImageAsset, LocalizedText, ServiceFAQ } from "@/lib/types";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.service.findUnique({ where: { id } });
  if (!row) notFound();

  const service: Service = {
    slug: row.slug,
    icon: row.icon,
    title: row.title as unknown as LocalizedText,
    shortDescription: row.shortDescription as unknown as LocalizedText,
    heroImage: row.heroImage as unknown as ImageAsset,
    gallery: row.gallery as unknown as ImageAsset[],
    description: row.description as unknown as LocalizedText[],
    benefits: row.benefits as unknown as LocalizedText[],
    process: row.process as unknown as LocalizedText[],
    faq: row.faq as unknown as ServiceFAQ[],
    relatedServiceSlugs: row.relatedServiceSlugs,
  };

  return (
    <div>
      <AdminPageHeader title="Xidməti redaktə et" description={row.slug} />
      <ServiceForm service={service} action={updateService.bind(null, id)} />
    </div>
  );
}
