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
            Fullständigt namn
          </label>
          <Input
            autoComplete="name"
            id="full_name"
            name="full_name"
            placeholder="Anna Svensson"
            required
            type="text"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            E-postadress
          </label>
          <Input
            autoComplete="email"
            id="email"
            name="email"
            placeholder="du@exempel.se"
            required
            type="email"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="password">
            Lösenord
          </label>
          <Input
            autoComplete="new-password"
            id="password"
            minLength={8}
            name="password"
            placeholder="Min. 8 tecken"
            required
            type="password"
          />
        </div>

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Skapar konto…" : "Skapa konto"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Har du redan ett konto?{" "}
        <Link className="text-primary hover:underline" href="/auth/login">
          Logga in
        </Link>
      </p>
    </div>
  );
}
