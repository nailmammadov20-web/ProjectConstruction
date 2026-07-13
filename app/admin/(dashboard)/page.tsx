import Link from "next/link";
import { prisma } from "@/lib/db";
import { Building2, HardHat, Newspaper, Mail, FileText, Briefcase, Quote, MapPin, Settings } from "lucide-react";

export default async function AdminDashboardPage() {
  const [projects, services, news, openMessages, openApplications, openings, testimonials, offices] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.newsArticle.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.jobApplication.count({ where: { status: "new" } }),
    prisma.jobOpening.count({ where: { isOpen: true } }),
    prisma.testimonial.count(),
    prisma.office.count(),
  ]);

  const cards = [
    { label: "Layihələr", value: projects, href: "/admin/projects", icon: Building2 },
    { label: "Xidmətlər", value: services, href: "/admin/services", icon: HardHat },
    { label: "Xəbərlər", value: news, href: "/admin/news", icon: Newspaper },
    { label: "Açıq vakansiyalar", value: openings, href: "/admin/careers", icon: Briefcase },
    { label: "Müştəri rəyləri", value: testimonials, href: "/admin/testimonials", icon: Quote },
    { label: "Ofislər", value: offices, href: "/admin/offices", icon: MapPin },
    { label: "Yeni mesajlar", value: openMessages, href: "/admin/messages", icon: Mail, highlight: openMessages > 0 },
    { label: "Yeni müraciətlər", value: openApplications, href: "/admin/applications", icon: FileText, highlight: openApplications > 0 },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">İdarə paneli</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Constructivegroup.az saytının məzmununa xoş gəlmisiniz.</p>
        </div>
        <Link
          href="/admin/settings"
          className="flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold-500/50"
        >
          <Settings className="size-4" /> Sayt Tənzimləmələri
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-sm border border-border bg-card p-4 transition-shadow hover:shadow-md sm:p-6"
          >
            <div className="flex items-center justify-between">
              <card.icon className="size-6 text-gold-600" />
              {card.highlight && <span className="size-2 rounded-full bg-destructive" />}
            </div>
            <p className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">{card.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
