import { prisma } from "@/lib/db";

export type ContactSubmissionInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  department: string;
  message: string;
};

export async function createContactSubmission(input: ContactSubmissionInput) {
  return prisma.contactSubmission.create({ data: input });
}

export async function getContactSubmissions() {
  return prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
}

export async function markContactSubmissionReviewed(id: string) {
  return prisma.contactSubmission.update({ where: { id }, data: { status: "reviewed" } });
}

export async function deleteContactSubmission(id: string) {
  return prisma.contactSubmission.delete({ where: { id } });
}
