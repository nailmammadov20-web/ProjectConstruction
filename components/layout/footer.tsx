import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getLocalized } from "@/lib/types";
import type { Service } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { MapPin, Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "@/components/icons/social-icons";
import { NewsletterForm } from "@/components/newsletter-form";

export function Footer({ services }: { services: Service[] }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white/80">
      <div className="container-wide grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-sm border border-gold-500 text-sm font-bold text-gold-500">
              CG
            </span>
            <span className="flex flex-col leading-none text-white">
              <span className="text-[15px] font-bold tracking-tight">Constructivegroup</span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">.az</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{t("description")}</p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { href: siteConfig.social.linkedin, Icon: LinkedInIcon, label: "LinkedIn" },
              { href: siteConfig.social.instagram, Icon: InstagramIcon, label: "Instagram" },
              { href: siteConfig.social.facebook, Icon: FacebookIcon, label: "Facebook" },
              { href: siteConfig.social.youtube, Icon: YouTubeIcon, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-sm border border-white/15 text-white/70 transition-colors hover:border-gold-500 hover:text-gold-500"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.15em] text-white uppercase">
            {t("quickLinks")}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/about" className="text-white/60 hover:text-gold-400 transition-colors">{tNav("about")}</Link></li>
            <li><Link href="/projects" className="text-white/60 hover:text-gold-400 transition-colors">{tNav("projects")}</Link></li>
            <li><Link href="/process" className="text-white/60 hover:text-gold-400 transition-colors">{tNav("process")}</Link></li>
            <li><Link href="/quality-safety" className="text-white/60 hover:text-gold-400 transition-colors">{tNav("quality")}</Link></li>
            <li><Link href="/news" className="text-white/60 hover:text-gold-400 transition-colors">{tNav("news")}</Link></li>
            <li><Link href="/careers" className="text-white/60 hover:text-gold-400 transition-colors">{tNav("careers")}</Link></li>
            <li><Link href="/contact" className="text-white/60 hover:text-gold-400 transition-colors">{tNav("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.15em] text-white uppercase">
            {t("services")}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-white/60 hover:text-gold-400 transition-colors"
                >
                  {getLocalized(service.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.15em] text-white uppercase">
            {t("newsletterTitle")}
          </h3>
          <p className="mt-5 text-sm text-white/60">{t("newsletterBody")}</p>
          <NewsletterForm />

          <div className="mt-8 space-y-3 text-sm text-white/60">
            <div className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-gold-500" />
              <span>Baku, Azerbaijan</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-gold-500" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-gold-400">
                {siteConfig.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-gold-500" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-400">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {t("registered")}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-gold-400">{t("privacy")}</Link>
            <Link href="/cookies" className="hover:text-gold-400">{t("cookies")}</Link>
            <Link href="/terms" className="hover:text-gold-400">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
