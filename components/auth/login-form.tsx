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

export function LoginForm() {
  const router = useRouter();
  const { refresh } = useAuthSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    setLoading(true);
    try {
      const session = await authAdapter.signIn({
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
      });
      await refresh();
      router.push(session.organizationId ? "/" : "/valkommen");
    } catch (err) {
      setError(swedishAuthError(err instanceof Error ? err.message : "Kunde inte logga in."));
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">E-post</label>
            <Input autoComplete="email" id="email" name="email" required type="email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Lösenord</label>
            <Input autoComplete="current-password" id="password" name="password" required type="password" />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button className="w-full" disabled={loading} size="lg" type="submit">
            {loading ? "Loggar in…" : "Logga in"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Inget konto?{" "}
          <Link className="font-semibold text-primary hover:underline" href="/skapa-konto">
            Skapa konto
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
