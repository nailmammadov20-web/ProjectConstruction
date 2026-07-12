"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { getLocalized } from "@/lib/types";
import type { Service, Project, NewsArticle } from "@/lib/types";
import { getIcon } from "@/lib/icon-map";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog } from "@/components/layout/search-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, Search, ArrowRight, ChevronRight } from "lucide-react";

export function Navbar({
  services,
  projects,
  newsArticles,
}: {
  services: Service[];
  projects: Project[];
  newsArticles: NewsArticle[];
}) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  const navLinks = [
    { href: "/about", label: t("about") },
    { href: "/process", label: t("process") },
    { href: "/quality-safety", label: t("quality") },
    { href: "/news", label: t("news") },
    { href: "/careers", label: t("careers") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent py-6"
          : "bg-background/95 py-3 shadow-sm backdrop-blur-md border-b border-border",
      )}
    >
      <div className="container-wide flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-sm border text-sm font-bold tracking-tight",
              transparent
                ? "border-white/40 text-white"
                : "border-gold-500 text-gold-600",
            )}
          >
            CG
          </span>
          <span
            className={cn(
              "flex flex-col leading-none",
              transparent ? "text-white" : "text-foreground",
            )}
          >
            <span className="text-[15px] font-bold tracking-tight">
              Constructivegroup
            </span>
            <span
              className={cn(
                "text-[10px] font-medium tracking-[0.2em] uppercase",
                transparent ? "text-white/60" : "text-muted-foreground",
              )}
            >
              .az
            </span>
          </span>
        </Link>

        <NavigationMenu className="hidden lg:flex" delay={100}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "bg-transparent text-sm font-medium",
                  transparent
                    ? "text-white/90 hover:text-white data-[state=open]:text-white"
                    : "text-foreground/90",
                )}
              >
                {t("services")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[640px] grid-cols-2 gap-1 p-5">
                  {services.map((service) => {
                    const Icon = getIcon(service.icon);
                    return (
                      <NavigationMenuLink
                        key={service.slug}
                        render={<Link href={`/services/${service.slug}`} />}
                        className="flex items-start gap-3 rounded-sm p-3 hover:bg-muted transition-colors"
                      >
                        <Icon className="mt-0.5 size-5 shrink-0 text-gold-600" />
                        <span>
                          <span className="block text-sm font-semibold text-foreground">
                            {getLocalized(service.title, locale)}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-1">
                            {getLocalized(service.shortDescription, locale)}
                          </span>
                        </span>
                      </NavigationMenuLink>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between border-t border-border bg-muted/50 px-5 py-3">
                  <p className="text-xs text-muted-foreground">{t("servicesOverview")}</p>
                  <NavigationMenuLink
                    render={<Link href="/services" />}
                    className="flex items-center gap-1 text-xs font-semibold text-gold-600 hover:text-gold-700 whitespace-nowrap"
                  >
                    {t("viewAllServices")} <ArrowRight className="size-3.5" />
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/projects" />}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors",
                  transparent ? "text-white/90 hover:text-white" : "text-foreground/90 hover:text-foreground",
                )}
              >
                {t("projects")}
              </NavigationMenuLink>
            </NavigationMenuItem>

            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  render={<Link href={link.href} />}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    transparent ? "text-white/90 hover:text-white" : "text-foreground/90 hover:text-foreground",
                  )}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1.5">
          <button
            aria-label={t("search")}
            onClick={() => setSearchOpen(true)}
            className={cn(
              "hidden size-9 items-center justify-center rounded-sm transition-colors sm:flex cursor-pointer",
              transparent ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground",
            )}
          >
            <Search className="size-[18px]" />
          </button>

          <div className="hidden sm:block">
            <ThemeToggle variant={transparent ? "light" : "dark"} />
          </div>

          <div className="hidden sm:block">
            <LanguageSwitcher variant={transparent ? "light" : "dark"} />
          </div>

          <Button
            render={<Link href="/contact" />}
            nativeButton={false}
            className="ml-2 hidden rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-400 md:inline-flex"
          >
            {t("contactUs")}
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label={t("menu")}
              className={cn(
                "flex size-9 items-center justify-center rounded-sm lg:hidden cursor-pointer",
                transparent ? "text-white" : "text-foreground",
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm border-l border-border bg-background p-0">
              <SheetHeader className="border-b border-border px-6 py-5">
                <SheetTitle className="text-left text-base font-bold">
                  Constructivegroup.az
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 overflow-y-auto px-3 py-4">
                <MobileLink href="/services" onNavigate={() => setMobileOpen(false)}>
                  {t("services")}
                </MobileLink>
                <MobileLink href="/projects" onNavigate={() => setMobileOpen(false)}>
                  {t("projects")}
                </MobileLink>
                {navLinks.map((link) => (
                  <MobileLink key={link.href} href={link.href} onNavigate={() => setMobileOpen(false)}>
                    {link.label}
                  </MobileLink>
                ))}
                <div className="my-3 border-t border-border" />
                <div className="flex items-center gap-2 px-3">
                  <LanguageSwitcher variant="dark" />
                  <ThemeToggle variant="dark" />
                </div>
                <div className="mt-3 px-3">
                  <Button
                    render={<Link href="/contact" onClick={() => setMobileOpen(false)} />}
                    nativeButton={false}
                    className="w-full rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-400"
                  >
                    {t("contactUs")}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        services={services}
        projects={projects}
        newsArticles={newsArticles}
      />
    </header>
  );
}

function MobileLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-center justify-between rounded-sm px-3 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
    >
      {children}
      <ChevronRight className="size-4 text-muted-foreground" />
    </Link>
  );
}
