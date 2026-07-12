import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  department: z.string().min(1),
  message: z.string().min(10),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const applicationFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  position: z.string().min(1),
  message: z.string().min(10),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
