import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTeamMember } from "@/app/admin/actions/team";
import { Pencil } from "lucide-react";

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Komanda" description={`${members.length} üzv`} newHref="/admin/team/new" newLabel="Yeni üzv" />

      <div className="overflow-x-auto rounded-sm border border-border bg-card">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Ad</th>
              <th className="px-5 py-3 font-semibold">Vəzifə</th>
              <th className="px-5 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((member) => {
              const role = (member.role as { en?: string })?.en ?? "";
              return (
                <tr key={member.id}>
                  <td className="px-5 py-3.5 font-medium text-foreground">{member.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{role}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/team/${member.id}`}
                        className="flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <DeleteButton action={deleteTeamMember.bind(null, member.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {members.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Hələ komanda üzvü yoxdur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
