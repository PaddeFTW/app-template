"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/actions/auth/sign-up";

export function RegisterForm() {
  const [state, action, isPending] = useActionState(signUp, {});

  return (
    <div className="space-y-6">
      {state.error && (
        <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="full_name">
            Full name
          </label>
          <Input
            autoComplete="name"
            id="full_name"
            name="full_name"
            placeholder="Jane Smith"
            required
            type="text"
          />
        </div>

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
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <Input
            autoComplete="new-password"
            id="password"
            minLength={8}
            name="password"
            placeholder="Min. 8 characters"
            required
            type="password"
          />
        </div>

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link className="text-primary hover:underline" href="/auth/login">
          Sign in
        </Link>
      </p>
    </div>
  );
}
