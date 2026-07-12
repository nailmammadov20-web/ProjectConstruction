"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, createSessionToken, setSessionCookie, clearSessionCookie } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email və şifrə tələb olunur." };
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    return { error: "Yanlış email və ya şifrə." };
  }

  const token = await createSessionToken({ sub: user.id, email: user.email });
  await setSessionCookie(token);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}
