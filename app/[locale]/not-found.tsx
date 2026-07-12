import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-20 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">404</span>
      <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 max-w-md text-base text-muted-foreground">{t("body")}</p>
      <Button
        render={<Link href="/" />}
        nativeButton={false}
        size="lg"
        className="mt-8 rounded-sm bg-navy-900 text-white hover:bg-navy-800"
      >
        <ArrowLeft className="mr-1 size-4" /> {t("cta")}
      </Button>
    </div>
  );
}
