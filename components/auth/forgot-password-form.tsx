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
          Om e-postadressen är registrerad skickar vi en återställningslänk
          inom kort. Kontrollera din inkorg och skräppost.
        </p>
        <Link className="text-sm text-primary hover:underline" href="/auth/login">
          Tillbaka till inloggning
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

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Skickar…" : "Skicka återställningslänk"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Kom du ihåg det?{" "}
        <Link className="text-primary hover:underline" href="/auth/login">
          Tillbaka till inloggning
        </Link>
      </p>
    </div>
  );
}
