"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const STORAGE_KEY = "cg-cookie-consent";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(true);
  const [marketing, setMarketing] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function save(consent: Consent) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
    setSettingsOpen(false);
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl rounded-sm border border-border bg-background/98 p-5 shadow-2xl backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{t("title")}</h3>
                <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-muted-foreground">
                  {t("body")}{" "}
                  <Link href="/cookies" className="underline underline-offset-2 hover:text-gold-600">
                    {t("customize")}
                  </Link>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-sm"
                  onClick={() => setSettingsOpen(true)}
                >
                  {t("customize")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-sm"
                  onClick={() => save({ necessary: true, analytics: false, marketing: false })}
                >
                  {t("rejectAll")}
                </Button>
                <Button
                  size="sm"
                  className="rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-400"
                  onClick={() => save({ necessary: true, analytics: true, marketing: true })}
                >
                  {t("acceptAll")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:rounded-sm">
          <DialogHeader>
            <DialogTitle>{t("settingsTitle")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-start justify-between gap-4 rounded-sm border border-border p-4">
              <div>
                <p className="text-sm font-semibold">{t("necessary")}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("necessaryBody")}</p>
              </div>
              <span className="mt-0.5 shrink-0 text-xs font-medium text-muted-foreground">ON</span>
            </div>
            <label className="flex cursor-pointer items-start justify-between gap-4 rounded-sm border border-border p-4">
              <div>
                <p className="text-sm font-semibold">{t("analytics")}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("analyticsBody")}</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-0.5 size-4 accent-gold-500"
              />
            </label>
            <label className="flex cursor-pointer items-start justify-between gap-4 rounded-sm border border-border p-4">
              <div>
                <p className="text-sm font-semibold">{t("marketing")}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("marketingBody")}</p>
              </div>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-0.5 size-4 accent-gold-500"
              />
            </label>
          </div>
          <DialogFooter>
            <Button
              className="w-full rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-400"
              onClick={() => save({ necessary: true, analytics, marketing })}
            >
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
