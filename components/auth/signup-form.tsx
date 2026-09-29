"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthSession } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authAdapter } from "@/lib/auth/adapter";
import { swedishAuthError } from "@/lib/auth/swedish-error";

export function SignupForm() {
  const router = useRouter();
  const { refresh } = useAuthSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    if (password.length < 6) {
      setError("Lösenordet ska ha minst 6 tecken.");
      return;
    }
    setLoading(true);
    try {
      await authAdapter.signUp({
        fullName: String(form.get("full-name") ?? "").trim(),
        email: String(form.get("email") ?? "").trim(),
        password,
        companyName: String(form.get("company-name") ?? "").trim(),
        orgNumber: String(form.get("org-number") ?? "").trim() || undefined,
      });
      await refresh();
      router.push("/");
    } catch (err) {
      setError(swedishAuthError(err instanceof Error ? err.message : "Kunde inte skapa konto."));
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="full-name">Ditt namn</label>
            <Input autoComplete="name" id="full-name" name="full-name" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="company-name">Företag</label>
            <Input id="company-name" name="company-name" placeholder="Exempel AB" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="org-number">Organisationsnummer</label>
            <Input id="org-number" name="org-number" placeholder="556000-0000" />
            <p className="text-xs text-muted-foreground">Valfritt nu. Sparas på företaget, inte i Smart arbetsyta.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">E-post</label>
            <Input autoComplete="email" id="email" name="email" required type="email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Lösenord</label>
            <Input autoComplete="new-password" id="password" minLength={6} name="password" required type="password" />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button className="w-full" disabled={loading} size="lg" type="submit">
            {loading ? "Skapar…" : "Skapa konto"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Har du redan konto?{" "}
          <Link className="font-semibold text-primary hover:underline" href="/login">
            Logga in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
