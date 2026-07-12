import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  theme = "light",
}: {
  items: BreadcrumbItem[];
  theme?: "light" | "dark";
}) {
  const t = useTranslations("breadcrumb");

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-1 transition-colors",
              theme === "dark" ? "text-white/55 hover:text-white" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Home className="size-3.5" />
            {t("home")}
          </Link>
          <ChevronRight className={cn("size-3.5", theme === "dark" ? "text-white/30" : "text-border")} />
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors",
                  theme === "dark" ? "text-white/55 hover:text-white" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={theme === "dark" ? "text-white" : "text-foreground"}>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <ChevronRight className={cn("size-3.5", theme === "dark" ? "text-white/30" : "text-border")} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
