"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { useAuthSession } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authAdapter } from "@/lib/auth/adapter";
import { swedishAuthError } from "@/lib/auth/swedish-error";

export function WelcomeForm() {
  const router = useRouter();
  const { session, refresh } = useAuthSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    const form = new FormData(event.currentTarget);
    setLoading(true);
    try {
      await authAdapter.createCompany({
        companyName: String(form.get("company-name") ?? "").trim(),
        orgNumber: String(form.get("org-number") ?? "").trim() || undefined,
      });
      await refresh();
      router.push("/");
    } catch (err) {
      setError(swedishAuthError(err instanceof Error ? err.message : "Kunde inte spara företaget."));
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="company-name">Företag</label>
            <Input autoFocus id="company-name" name="company-name" placeholder="Exempel AB" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="org-number">Organisationsnummer</label>
            <Input id="org-number" name="org-number" placeholder="556000-0000" />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button className="w-full" disabled={loading || !session} size="lg" type="submit">
            {loading ? "Sparar…" : "Fortsätt"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
