import { AdminPageHeader } from "@/components/admin/page-header";
import { TeamForm } from "@/components/admin/team-form";
import { createTeamMember } from "@/app/admin/actions/team";

export default function NewTeamMemberPage() {
  return (
    <div>
      <AdminPageHeader title="Yeni üzv" description="Komandaya yeni üzv əlavə edin" />
      <TeamForm action={createTeamMember} />
    </div>
  );
}
