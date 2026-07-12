import { prisma } from "@/lib/db";

export type JobApplicationInput = {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resumeFileName?: string;
};

export async function createJobApplication(input: JobApplicationInput) {
  return prisma.jobApplication.create({ data: input });
}

export async function getJobApplications() {
  return prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" } });
}

export async function markJobApplicationReviewed(id: string) {
  return prisma.jobApplication.update({ where: { id }, data: { status: "reviewed" } });
}

export async function deleteJobApplication(id: string) {
  return prisma.jobApplication.delete({ where: { id } });
}
