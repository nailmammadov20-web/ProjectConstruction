import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="lg:pl-64">
      <AdminSidebar />
      <AdminTopbar email={session.email} />
      <main className="px-6 py-8 lg:px-8">{children}</main>
    </div>
  );
}
