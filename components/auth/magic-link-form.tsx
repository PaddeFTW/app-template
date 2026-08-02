"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestMagicLink } from "@/actions/auth/magic-link";

export function MagicLinkForm() {
  const [state, action, isPending] = useActionState(requestMagicLink, {});

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
          {isPending ? "Skickar länk…" : "Skicka e-postlänk"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Tillbaka till{" "}
        <Link className="text-primary hover:underline" href="/auth/login">
          inloggning med lösenord
        </Link>
      </p>
    </div>
  );
}
