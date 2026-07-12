"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Building2,
  HardHat,
  Newspaper,
  Users,
  Award,
  Handshake,
  Briefcase,
  MapPin,
  Quote,
  Mail,
  FileText,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "İdarə paneli", icon: LayoutDashboard, exact: true },
  { href: "/admin/settings", label: "Sayt Tənzimləmələri", icon: Settings },
  { href: "/admin/projects", label: "Layihələr", icon: Building2 },
  { href: "/admin/services", label: "Xidmətlər", icon: HardHat },
  { href: "/admin/news", label: "Xəbərlər", icon: Newspaper },
  { href: "/admin/team", label: "Komanda", icon: Users },
  { href: "/admin/certificates", label: "Sertifikatlar", icon: Award },
  { href: "/admin/partners", label: "Tərəfdaşlar", icon: Handshake },
  { href: "/admin/testimonials", label: "Müştəri Rəyləri", icon: Quote },
  { href: "/admin/offices", label: "Ofislər", icon: MapPin },
  { href: "/admin/careers", label: "Vakansiyalar", icon: Briefcase },
  { href: "/admin/messages", label: "Mesajlar", icon: Mail },
  { href: "/admin/applications", label: "Müraciətlər", icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card lg:flex">
      <div className="flex items-center gap-2.5 border-b border-border px-6 py-5">
        <span className="flex size-9 items-center justify-center rounded-sm border border-gold-500 text-sm font-bold text-gold-600">
          CG
        </span>
        <div className="leading-none">
          <p className="text-sm font-bold">Constructivegroup.az</p>
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Admin Panel</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-navy-900 text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
