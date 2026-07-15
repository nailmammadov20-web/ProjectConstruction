"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { applicationFormSchema, type ApplicationFormValues } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLocalized, type Locale, type JobOpening } from "@/lib/types";
import { submitApplicationForm } from "@/app/actions/forms";
import { uploadResume } from "@/app/actions/upload-resume";
import { Loader2, UploadCloud, CheckCircle2 } from "lucide-react";

export function ApplicationForm({
  jobOpenings,
  presetPosition,
}: {
  jobOpenings: JobOpening[];
  presetPosition?: string;
}) {
  const t = useTranslations("form");
  const tCareers = useTranslations("careers");
  const locale = useLocale() as Locale;
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: presetPosition ?? "",
      message: "",
    },
  });

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResumeUrl(null);
    setUploadError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadResume(formData);
    setUploading(false);

    if ("error" in result) {
      setUploadError(result.error);
      setFileName(null);
    } else {
      setResumeUrl(result.url);
    }
  }

  async function onSubmit(values: ApplicationFormValues) {
    const result = await submitApplicationForm({
      ...values,
      resumeFileName: fileName ?? undefined,
      resumeUrl: resumeUrl ?? undefined,
    });
    if (!result.success) {
      toast.error(t("error"));
      return;
    }
    toast.success(t("success"));
    reset();
    setFileName(null);
    setResumeUrl(null);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-sm border border-border bg-card p-7 sm:p-9">
      <h3 className="text-lg font-bold text-foreground">{tCareers("formTitle")}</h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="app-name" className="text-sm font-medium">{t("name")}</Label>
          <Input id="app-name" placeholder={t("namePlaceholder")} className="mt-2 rounded-sm" {...register("name")} />
          {errors.name && <p className="mt-1.5 text-xs text-destructive">{t("required")}</p>}
        </div>
        <div>
          <Label htmlFor="app-email" className="text-sm font-medium">{t("email")}</Label>
          <Input id="app-email" type="email" placeholder={t("emailPlaceholder")} className="mt-2 rounded-sm" {...register("email")} />
          {errors.email && <p className="mt-1.5 text-xs text-destructive">{t("invalidEmail")}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="app-phone" className="text-sm font-medium">{t("phone")}</Label>
          <Input id="app-phone" placeholder={t("phonePlaceholder")} className="mt-2 rounded-sm" {...register("phone")} />
          {errors.phone && <p className="mt-1.5 text-xs text-destructive">{t("required")}</p>}
        </div>
        <div>
          <Label className="text-sm font-medium">{t("position")}</Label>
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="mt-2 w-full rounded-sm">
                  <SelectValue placeholder={t("position")} />
                </SelectTrigger>
                <SelectContent>
                  {jobOpenings.map((job) => (
                    <SelectItem key={job.slug} value={job.slug}>
                      {getLocalized(job.title, locale)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="app-message" className="text-sm font-medium">{t("coverLetter")}</Label>
        <Textarea
          id="app-message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          className="mt-2 rounded-sm"
          {...register("message")}
        />
        {errors.message && <p className="mt-1.5 text-xs text-destructive">{t("required")}</p>}
      </div>

      <div>
        <Label className="text-sm font-medium">{t("resume")}</Label>
        <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-gold-500/50">
          {uploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : resumeUrl ? (
            <CheckCircle2 className="size-4 text-green-600" />
          ) : (
            <UploadCloud className="size-4" />
          )}
          {uploading ? "Yüklənir..." : (fileName ?? "PDF, DOC — max 10MB")}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {uploadError && <p className="mt-1.5 text-xs text-destructive">{uploadError}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || uploading}
        size="lg"
        className="w-full rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-400"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        {tCareers("applyNow")}
      </Button>
    </form>
  );
}
