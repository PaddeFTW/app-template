"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/actions/auth/sign-in";

interface LoginFormProps {
  redirectTo?: string;
  resetSuccess?: boolean;
}

export function LoginForm({ redirectTo, resetSuccess }: LoginFormProps) {
  const [state, action, isPending] = useActionState(signIn, {});

  return (
    <div className="space-y-6">
      {resetSuccess && (
        <p className="rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-success">
          Password updated successfully. Sign in with your new password.
        </p>
      )}

      {state.error && (
        <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <form action={action} className="space-y-4">
        {redirectTo && (
          <input name="redirectTo" type="hidden" value={redirectTo} />
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email address
          </label>
          <Input
            autoComplete="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <Link
              className="text-sm text-primary hover:underline"
              href="/auth/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            autoComplete="current-password"
            id="password"
            minLength={8}
            name="password"
            placeholder="••••••••"
            required
            type="password"
          />
        </div>

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link className="text-primary hover:underline" href="/auth/register">
          Create account
        </Link>
      </p>
    </div>
  );
}
