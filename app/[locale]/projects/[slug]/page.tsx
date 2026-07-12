import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/types";
import { getLocalized } from "@/lib/types";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { Gallery } from "@/components/gallery";
import { ProjectCard } from "@/components/project-card";
import { BeforeAfterSlider } from "@/components/projects/before-after-slider";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/seo/json-ld";
import { getProjects, getProjectBySlug, getRelatedProjects } from "@/lib/repo/projects";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { MapPin, Building2, Ruler, CalendarCheck, Layers } from "lucide-react";

export async function generateStaticParams() {
  const projects = await getProjects();
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const title = getLocalized(project.title, locale as Locale);

  return {
    title,
    description: getLocalized(project.summary, locale as Locale),
    alternates: { canonical: `/${locale}/projects/${slug}` },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projects" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const related = await getRelatedProjects(project);
  const title = getLocalized(project.title, locale);
  const pageUrl = `${siteConfig.url}/${locale}/projects/${slug}`;

  const keyFacts = [
    { icon: MapPin, label: tCommon("location"), value: getLocalized(project.location, locale) },
    { icon: Building2, label: tCommon("client"), value: getLocalized(project.client, locale) },
    { icon: Ruler, label: tCommon("area"), value: project.area },
    { icon: CalendarCheck, label: tCommon("completion"), value: project.completionDate },
    { icon: Layers, label: tCommon("scope"), value: getLocalized(project.scope, locale) },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tCommon("home"), url: siteConfig.url },
          { name: tNav("projects"), url: `${siteConfig.url}/${locale}/projects` },
          { name: title, url: pageUrl },
        ]}
      />
      <ProjectJsonLd name={title} description={getLocalized(project.summary, locale)} image={project.heroImage.src} url={pageUrl} />

      <PageHero
        eyebrow={t("detailEyebrow")}
        title={title}
        body={getLocalized(project.summary, locale)}
        image={project.heroImage}
        breadcrumbs={[{ label: tNav("projects"), href: "/projects" }, { label: title }]}
      />

      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 gap-14 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-xl font-bold text-foreground">{tCommon("overview")}</h2>
            <div className="mt-5 space-y-5">
              {project.overview.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.06}>
                  <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
                    {getLocalized(paragraph, locale)}
                  </p>
                </Reveal>
              ))}
            </div>

            {project.challenges.length > 0 && (
              <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{tCommon("challenges")}</h3>
                  <div className="mt-4 space-y-4">
                    {project.challenges.map((c, index) => (
                      <p key={index} className="text-sm leading-relaxed text-muted-foreground">
                        {getLocalized(c, locale)}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{tCommon("solutions")}</h3>
                  <div className="mt-4 space-y-4">
                    {project.solutions.map((s, index) => (
                      <p key={index} className="text-sm leading-relaxed text-muted-foreground">
                        {getLocalized(s, locale)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {project.technologies.length > 0 && (
              <div className="mt-14">
                <h3 className="text-lg font-bold text-foreground">{tCommon("technologies")}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm border border-gold-500/30 bg-gold-50 px-3 py-1.5 text-xs font-medium text-gold-700 dark:bg-gold-500/10 dark:text-gold-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.timeline.length > 0 && (
              <div className="mt-14">
                <h3 className="text-lg font-bold text-foreground">{tCommon("timeline")}</h3>
                <ol className="mt-6 space-y-6 border-l border-border pl-6">
                  {project.timeline.map((milestone, index) => (
                    <Reveal key={index} delay={index * 0.05} className="relative">
                      <span className="absolute -left-[29px] top-1 size-3 rounded-full border-2 border-gold-500 bg-background" />
                      <span className="text-xs font-bold uppercase tracking-wide text-gold-600">
                        {getLocalized(milestone.date, locale)}
                      </span>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {getLocalized(milestone.label, locale)}
                      </p>
                    </Reveal>
                  ))}
                </ol>
              </div>
            )}

            {project.beforeImage && project.afterImage && (
              <div className="mt-14">
                <BeforeAfterSlider before={project.beforeImage} after={project.afterImage} />
              </div>
            )}

            {project.gallery.length > 0 && (
              <div className="mt-14">
                <h3 className="text-lg font-bold text-foreground">{tCommon("gallery")}</h3>
                <div className="mt-6">
                  <Gallery images={project.gallery} />
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-sm border border-border bg-muted/40 p-7 lg:sticky lg:top-28">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("keyFacts")}
            </h3>
            <dl className="mt-5 space-y-5">
              {keyFacts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-3">
                  <fact.icon className="mt-0.5 size-4 shrink-0 text-gold-600" />
                  <div>
                    <dt className="text-xs text-muted-foreground">{fact.label}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-foreground">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <Link
              href="/contact"
              className="mt-7 inline-flex h-10 w-full items-center justify-center rounded-sm bg-gold-500 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
            >
              {tNav("contactUs")}
            </Link>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-muted/40">
          <div className="container-wide">
            <SectionTitle eyebrow={t("eyebrow")} title={tCommon("relatedProjects")} />
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, index) => (
                <ProjectCard key={r.slug} project={r} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title={tHome("ctaTitle")} body={tHome("ctaBody")} buttonLabel={tHome("ctaButton")} />
    </>
  );
}
