"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/components/admin/nav-items";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function AdminMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Menyu"
        className="flex size-9 items-center justify-center rounded-sm text-foreground lg:hidden cursor-pointer"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="flex w-64 flex-col border-r border-border bg-card p-0">
        <SheetHeader className="flex-row items-center gap-2.5 space-y-0 border-b border-border px-6 py-5">
          <span className="flex size-9 items-center justify-center rounded-sm border border-gold-500 text-sm font-bold text-gold-600">
            CG
          </span>
          <div className="leading-none">
            <SheetTitle className="text-left text-sm font-bold">Constructivegroup.az</SheetTitle>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Admin Panel
            </p>
          </div>
        </SheetHeader>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
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
      </SheetContent>
    </Sheet>
  );
}
