"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-sm border border-border bg-card p-8 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-sm border border-gold-500 text-sm font-bold text-gold-600">
            CG
          </span>
          <div className="leading-none">
            <p className="text-sm font-bold">Constructivegroup.az</p>
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        <h1 className="mt-7 text-xl font-bold text-foreground">Daxil ol</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Davam etmək üçün admin hesabınıza daxil olun.</p>

        <form action={formAction} className="mt-7 space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">E-poçt</Label>
            <Input id="email" name="email" type="email" required autoFocus className="mt-2 rounded-sm" />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium">Şifrə</Label>
            <Input id="password" name="password" type="password" required className="mt-2 rounded-sm" />
          </div>

          {state.error && (
            <p className="rounded-sm bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
          )}

          <Button type="submit" disabled={pending} className="w-full rounded-sm bg-navy-900 text-white hover:bg-navy-800">
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
            Daxil ol
          </Button>
        </form>
      </div>
    </div>
  );
}
