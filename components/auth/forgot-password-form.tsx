"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "@/actions/auth/forgot-password";

export function ForgotPasswordForm() {
  const [state, action, isPending] = useActionState(requestPasswordReset, {});

  if (state.success) {
    return (
      <div className="space-y-4 text-center">
        <p className="rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-success">
          If that email is registered, you&apos;ll receive a reset link shortly.
          Check your inbox and spam folder.
        </p>
        <Link className="text-sm text-primary hover:underline" href="/auth/login">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {state.error && (
        <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <form action={action} className="space-y-4">
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

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Sending…" : "Send reset link"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link className="text-primary hover:underline" href="/auth/login">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
