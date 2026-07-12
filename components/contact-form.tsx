"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { submitContactForm } from "@/app/actions/forms";
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
import { Loader2, Send } from "lucide-react";

const departments = [
  { value: "general", label: "General Enquiry" },
  { value: "business-development", label: "Business Development" },
  { value: "project-management", label: "Project Management" },
  { value: "careers", label: "Careers" },
  { value: "media", label: "Media & Press" },
];

export function ContactForm() {
  const t = useTranslations("form");
  const tCommon = useTranslations("common");
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", department: "general", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    const result = await submitContactForm(values);
    if (!result.success) {
      toast.error(t("error"));
      return;
    }
    toast.success(t("success"));
    setSubmitted(true);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">{t("name")}</Label>
          <Input id="name" placeholder={t("namePlaceholder")} className="mt-2 rounded-sm" {...register("name")} />
          {errors.name && <p className="mt-1.5 text-xs text-destructive">{t("required")}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-medium">{t("email")}</Label>
          <Input id="email" type="email" placeholder={t("emailPlaceholder")} className="mt-2 rounded-sm" {...register("email")} />
          {errors.email && <p className="mt-1.5 text-xs text-destructive">{t("invalidEmail")}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone" className="text-sm font-medium">{t("phone")}</Label>
          <Input id="phone" placeholder={t("phonePlaceholder")} className="mt-2 rounded-sm" {...register("phone")} />
        </div>
        <div>
          <Label htmlFor="company" className="text-sm font-medium">{t("company")}</Label>
          <Input id="company" className="mt-2 rounded-sm" {...register("company")} />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">{t("department")}</Label>
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="mt-2 w-full rounded-sm">
                <SelectValue placeholder={t("department")} />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label htmlFor="message" className="text-sm font-medium">{t("message")}</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          className="mt-2 rounded-sm"
          {...register("message")}
        />
        {errors.message && <p className="mt-1.5 text-xs text-destructive">{t("required")}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-400 sm:w-auto"
      >
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {tCommon("sendMessage")}
      </Button>

      {submitted && (
        <p className="text-sm text-muted-foreground" role="status">
          {t("success")}
        </p>
      )}
    </form>
  );
}
