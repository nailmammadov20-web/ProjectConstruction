"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const tForm = useTranslations("form");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error(tForm("invalidEmail"));
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setEmail("");
      toast.success(tForm("success"));
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("newsletterPlaceholder")}
        className="h-10 rounded-sm border-white/15 bg-white/5 text-sm text-white placeholder:text-white/40 focus-visible:ring-gold-500"
      />
      <button
        type="submit"
        disabled={submitting}
        aria-label={t("subscribe")}
        className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-gold-500 text-navy-900 transition-colors hover:bg-gold-400 disabled:opacity-60 cursor-pointer"
      >
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
