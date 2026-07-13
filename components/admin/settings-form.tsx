"use client";

import * as React from "react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Field, LocalizedTextField, ImageField } from "@/components/admin/form-fields";
import { AchievementsRepeater } from "@/components/admin/achievements-repeater";
import { TimelineRepeater } from "@/components/admin/timeline-repeater";
import { SubmitButton } from "@/components/admin/submit-button";
import { cn } from "@/lib/utils";
import type { SiteSettings, Locale } from "@/lib/types";
import { Sparkles, Building2, UserCircle2, ShieldCheck } from "lucide-react";

type ActionState = { error?: string; success?: boolean };
type SettingsAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

const localeLabels: Record<Locale, string> = { en: "English", az: "Azərbaycan", ru: "Русский" };

const tabs = [
  { value: "hero", label: "Hero Bölməsi", icon: Sparkles },
  { value: "about", label: "Haqqımızda", icon: Building2 },
  { value: "ceo", label: "İcraçı Direktor", icon: UserCircle2 },
  { value: "quality", label: "Keyfiyyət və Təhlükəsizlik", icon: ShieldCheck },
] as const;

export function SettingsForm({ settings, action }: { settings: SiteSettings; action: SettingsAction }) {
  const [state, formAction] = useActionState(action, {});
  const [activeTab, setActiveTab] = React.useState<(typeof tabs)[number]["value"]>("hero");
  const [activeLocale, setActiveLocale] = React.useState<Locale>("en");

  useEffect(() => {
    if (state.success) toast.success("Tənzimləmələr yadda saxlanıldı.");
  }, [state.success]);

  return (
    <form action={formAction} className="pb-24">
      {state.error && (
        <p className="mb-5 rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <TabsList className="h-auto flex-wrap gap-1 bg-muted p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="h-9 gap-1.5 rounded-sm px-3 text-xs font-semibold sm:text-sm"
                >
                  <Icon className="size-3.5" />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="flex items-center gap-1 rounded-sm border border-border bg-card p-1">
            {(["en", "az", "ru"] as Locale[]).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setActiveLocale(loc)}
                className={cn(
                  "rounded-sm px-2.5 py-1.5 text-xs font-bold tracking-wide transition-colors cursor-pointer",
                  activeLocale === loc
                    ? "bg-gold-500 text-navy-900"
                    : "text-muted-foreground hover:text-foreground",
                )}
                title={localeLabels[loc]}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <TabsContent value="hero" className="mt-6 space-y-5">
          <LocalizedTextField
            name="heroEyebrow"
            label="Üst yazı (eyebrow)"
            defaultValue={settings.heroEyebrow}
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <LocalizedTextField
            name="heroTitle"
            label="Başlıq"
            defaultValue={settings.heroTitle}
            multiline
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <LocalizedTextField
            name="heroSubtitle"
            label="Alt başlıq"
            defaultValue={settings.heroSubtitle}
            multiline
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <Field
            label="Video URL (könüllü)"
            htmlFor="heroVideoUrl"
            hint="Drone/layihə videosu üçün birbaşa .mp4 keçidi. Boş saxlasanız, aşağıdakı şəkil göstərilir."
          >
            <Input
              id="heroVideoUrl"
              name="heroVideoUrl"
              placeholder="https://.../drone-reel.mp4"
              defaultValue={settings.heroVideoUrl ?? ""}
              className="mt-2 rounded-sm"
            />
          </Field>
          <ImageField name="heroImage" label="Ehtiyat / poster şəkli" defaultValue={settings.heroImage} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Field label="Təcrübə (il)" htmlFor="statExperience">
              <Input id="statExperience" name="statExperience" type="number" defaultValue={settings.statExperience} className="mt-2 rounded-sm" />
            </Field>
            <Field label="Layihələr" htmlFor="statProjects">
              <Input id="statProjects" name="statProjects" type="number" defaultValue={settings.statProjects} className="mt-2 rounded-sm" />
            </Field>
            <Field label="Ölkələr" htmlFor="statCountries">
              <Input id="statCountries" name="statCountries" type="number" defaultValue={settings.statCountries} className="mt-2 rounded-sm" />
            </Field>
            <Field label="Mühəndislər" htmlFor="statEngineers">
              <Input id="statEngineers" name="statEngineers" type="number" defaultValue={settings.statEngineers} className="mt-2 rounded-sm" />
            </Field>
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6 space-y-5">
          <LocalizedTextField
            name="aboutIntro"
            label="Giriş mətni"
            defaultValue={settings.aboutIntro}
            multiline
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <LocalizedTextField
            name="missionText"
            label="Missiya"
            defaultValue={settings.missionText}
            multiline
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <LocalizedTextField
            name="visionText"
            label="Vizyon"
            defaultValue={settings.visionText}
            multiline
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <div className="border-t border-border pt-5">
            <AchievementsRepeater
              name="achievements_json"
              label="Nailiyyətlər"
              defaultValue={settings.achievements}
              hint="Şirkətin əsas nailiyyətləri — il və başlıq."
            />
          </div>
          <div className="border-t border-border pt-5">
            <TimelineRepeater
              name="companyTimeline_json"
              label="Şirkət Xronologiyası"
              defaultValue={settings.companyTimeline}
              hint="Şirkətin tarixi mərhələləri — il, başlıq və təsvir."
            />
          </div>
        </TabsContent>

        <TabsContent value="ceo" className="mt-6 space-y-5">
          <Field label="Ad Soyad" htmlFor="ceoName">
            <Input id="ceoName" name="ceoName" defaultValue={settings.ceoName} required className="mt-2 rounded-sm" />
          </Field>
          <LocalizedTextField
            name="ceoRole"
            label="Vəzifə"
            defaultValue={settings.ceoRole}
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <LocalizedTextField
            name="ceoQuote"
            label="Sitat"
            defaultValue={settings.ceoQuote}
            multiline
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <ImageField name="ceoPhoto" label="Foto" defaultValue={settings.ceoPhoto} />
        </TabsContent>

        <TabsContent value="quality" className="mt-6 space-y-5">
          <LocalizedTextField
            name="hseBody"
            label="HSE Siyasəti"
            defaultValue={settings.hseBody}
            multiline
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <LocalizedTextField
            name="qualityPolicyBody"
            label="Keyfiyyət Siyasəti"
            defaultValue={settings.qualityPolicyBody}
            multiline
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <LocalizedTextField
            name="environmentBody"
            label="Ətraf Mühitə Sadiqlik"
            defaultValue={settings.environmentBody}
            multiline
            activeLocale={activeLocale}
            onActiveLocaleChange={setActiveLocale}
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Field label="LTIFR" htmlFor="safetyLtifr">
              <Input id="safetyLtifr" name="safetyLtifr" type="number" step="0.01" defaultValue={settings.safetyLtifr} className="mt-2 rounded-sm" />
            </Field>
            <Field label="Təhlükəsiz saat (M)" htmlFor="safetyManHours">
              <Input id="safetyManHours" name="safetyManHours" type="number" step="0.1" defaultValue={settings.safetyManHours} className="mt-2 rounded-sm" />
            </Field>
            <Field label="Audit edilmiş (%)" htmlFor="safetyAuditedPct">
              <Input id="safetyAuditedPct" name="safetyAuditedPct" type="number" defaultValue={settings.safetyAuditedPct} className="mt-2 rounded-sm" />
            </Field>
            <Field label="Ölüm hadisəsi" htmlFor="safetyFatalities">
              <Input id="safetyFatalities" name="safetyFatalities" type="number" defaultValue={settings.safetyFatalities} className="mt-2 rounded-sm" />
            </Field>
          </div>
        </TabsContent>
      </Tabs>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-6 py-3 backdrop-blur-md lg:pl-64">
        <div className="mx-auto flex max-w-5xl items-center justify-end gap-3">
          <p className="mr-auto text-xs text-muted-foreground">
            Dəyişikliklər saytda dərhal görünəcək.
          </p>
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
