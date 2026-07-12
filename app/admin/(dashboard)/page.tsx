import Link from "next/link";
import { prisma } from "@/lib/db";
import { Building2, HardHat, Newspaper, Mail, FileText, Briefcase } from "lucide-react";

export default async function AdminDashboardPage() {
  const [projects, services, news, openMessages, openApplications, openings] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.newsArticle.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.jobApplication.count({ where: { status: "new" } }),
    prisma.jobOpening.count({ where: { isOpen: true } }),
  ]);

  const cards = [
    { label: "Layihələr", value: projects, href: "/admin/projects", icon: Building2 },
    { label: "Xidmətlər", value: services, href: "/admin/services", icon: HardHat },
    { label: "Xəbərlər", value: news, href: "/admin/news", icon: Newspaper },
    { label: "Açıq vakansiyalar", value: openings, href: "/admin/careers", icon: Briefcase },
    { label: "Yeni mesajlar", value: openMessages, href: "/admin/messages", icon: Mail, highlight: openMessages > 0 },
    { label: "Yeni müraciətlər", value: openApplications, href: "/admin/applications", icon: FileText, highlight: openApplications > 0 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">İdarə paneli</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Constructivegroup.az saytının məzmununa xoş gəlmisiniz.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-sm border border-border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <card.icon className="size-6 text-gold-600" />
              {card.highlight && <span className="size-2 rounded-full bg-destructive" />}
            </div>
            <p className="mt-4 text-3xl font-bold text-foreground">{card.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
