"use server";

import { z } from "zod";
import { contactFormSchema, applicationFormSchema } from "@/lib/schemas";
import { createContactSubmission } from "@/lib/repo/contact";
import { createJobApplication } from "@/lib/repo/applications";

const applicationSubmissionSchema = applicationFormSchema.extend({
  resumeFileName: z.string().optional(),
});

export async function submitContactForm(values: unknown) {
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false as const, error: "Invalid form data" };
  }
  await createContactSubmission(parsed.data);
  return { success: true as const };
}

export async function submitApplicationForm(values: unknown) {
  const parsed = applicationSubmissionSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false as const, error: "Invalid form data" };
  }
  await createJobApplication(parsed.data);
  return { success: true as const };
}
