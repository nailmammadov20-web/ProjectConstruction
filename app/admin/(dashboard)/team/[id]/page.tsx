import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { TeamForm } from "@/components/admin/team-form";
import { updateTeamMember } from "@/app/admin/actions/team";
import type { TeamMember, ImageAsset, LocalizedText } from "@/lib/types";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.teamMember.findUnique({ where: { id } });
  if (!row) notFound();

  const member: TeamMember = {
    slug: row.slug,
    name: row.name,
    role: row.role as unknown as LocalizedText,
    photo: row.photo as unknown as ImageAsset,
    bio: (row.bio as unknown as LocalizedText | null) ?? undefined,
  };

  return (
    <div>
      <AdminPageHeader title="Üzvü redaktə et" description={row.name} />
      <TeamForm member={member} action={updateTeamMember.bind(null, id)} />
    </div>
  );
}
