import { logoutAction } from "@/app/admin/actions/auth";
import { AdminMobileNav } from "@/components/admin/mobile-nav";
import { LogOut } from "lucide-react";
import Link from "next/link";

export function AdminTopbar({ email }: { email: string }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur sm:px-6 lg:justify-end lg:px-8">
      <AdminMobileNav />
      <div className="flex items-center gap-4">
        <Link href="/" target="_blank" className="text-xs font-medium text-muted-foreground hover:text-foreground">
          Sayta bax ↗
        </Link>
        <span className="hidden text-xs text-muted-foreground sm:inline">{email}</span>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive cursor-pointer"
          >
            <LogOut className="size-3.5" /> Çıxış
          </button>
        </form>
      </div>
    </header>
  );
}
