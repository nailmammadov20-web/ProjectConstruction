"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Field, LocalizedTextField, JsonField, ImageField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import type { SiteSettings } from "@/lib/types";

type ActionState = { error?: string; success?: boolean };
type SettingsAction = (state: ActionState, formData: FormData) => Promise<ActionState>;

export function SettingsForm({ settings, action }: { settings: SiteSettings; action: SettingsAction }) {
  const [state, formAction] = useActionState(action, {});

  useEffect(() => {
    if (state.success) toast.success("Tənzimləmələr yadda saxlanıldı.");
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <p className="rounded-sm bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.error}</p>
      )}

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Hero Bölməsi</h2>
        <div className="mt-5 space-y-5">
          <LocalizedTextField name="heroEyebrow" label="Üst yazı (eyebrow)" defaultValue={settings.heroEyebrow} />
          <LocalizedTextField name="heroTitle" label="Başlıq" defaultValue={settings.heroTitle} multiline />
          <LocalizedTextField name="heroSubtitle" label="Alt başlıq" defaultValue={settings.heroSubtitle} multiline />
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
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Haqqımızda</h2>
        <div className="mt-5 space-y-5">
          <LocalizedTextField name="aboutIntro" label="Giriş mətni" defaultValue={settings.aboutIntro} multiline />
          <LocalizedTextField name="missionText" label="Missiya" defaultValue={settings.missionText} multiline />
          <LocalizedTextField name="visionText" label="Vizyon" defaultValue={settings.visionText} multiline />
          <JsonField
            name="achievements_json"
            label="Nailiyyətlər"
            defaultValue={settings.achievements}
            hint='[{"year":"2024","title":{"en":"..."}}]'
          />
          <JsonField
            name="companyTimeline_json"
            label="Şirkət Xronologiyası"
            defaultValue={settings.companyTimeline}
            rows={8}
            hint='[{"year":"2004","title":{"en":"..."},"body":{"en":"..."}}]'
          />
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Baş İcraçı Direktordan Mesaj</h2>
        <div className="mt-5 space-y-5">
          <Field label="Ad Soyad" htmlFor="ceoName">
            <Input id="ceoName" name="ceoName" defaultValue={settings.ceoName} required className="mt-2 rounded-sm" />
          </Field>
          <LocalizedTextField name="ceoRole" label="Vəzifə" defaultValue={settings.ceoRole} />
          <LocalizedTextField name="ceoQuote" label="Sitat" defaultValue={settings.ceoQuote} multiline />
          <ImageField name="ceoPhoto" label="Foto" defaultValue={settings.ceoPhoto} />
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Keyfiyyət və Təhlükəsizlik</h2>
        <div className="mt-5 space-y-5">
          <LocalizedTextField name="hseBody" label="HSE Siyasəti" defaultValue={settings.hseBody} multiline />
          <LocalizedTextField name="qualityPolicyBody" label="Keyfiyyət Siyasəti" defaultValue={settings.qualityPolicyBody} multiline />
          <LocalizedTextField name="environmentBody" label="Ətraf Mühitə Sadiqlik" defaultValue={settings.environmentBody} multiline />
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
        </div>
      </section>

      <SubmitButton />
    </form>
  );
}
