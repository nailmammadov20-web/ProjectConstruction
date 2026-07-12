"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { StatCounter } from "@/components/stat-counter";
import { stats } from "@/lib/data/stats";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("hero.stats");

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy-900">
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full"
        >
          <Image
            src="https://picsum.photos/seed/hero-drone-construction/2400/1500"
            alt="Aerial drone view of an active construction site at golden hour"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
        <div className="absolute inset-0 bg-navy-950/20 grain-overlay" />
      </div>

      <div className="container-wide relative z-10 flex flex-col gap-14 pb-20 pt-40 sm:pb-24">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400"
          >
            <span className="h-px w-8 bg-gold-400" />
            {t("eyebrow")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold leading-[1.08] text-white text-balance sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button
              render={<Link href="/projects" />}
              nativeButton={false}
              size="lg"
              className="rounded-sm bg-gold-500 px-7 text-navy-900 hover:bg-gold-400"
            >
              {t("ctaPrimary")} <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-sm border-white/30 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
            >
              {t("ctaSecondary")}
            </Button>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.56 }}
          className="grid grid-cols-2 gap-8 border-t border-white/15 pt-8 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.key}>
              <dt className="text-3xl font-bold text-white sm:text-4xl">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </dt>
              <dd className="mt-1.5 text-xs font-medium uppercase tracking-wide text-white/55 sm:text-sm">
                {tStats(stat.key)}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-6 right-6 z-10 hidden items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50 sm:flex"
      >
        {t("scroll")}
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
