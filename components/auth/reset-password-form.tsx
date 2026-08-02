"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/actions/auth/reset-password";

export function ResetPasswordForm() {
  const [state, action, isPending] = useActionState(resetPassword, {});

  return (
    <div className="space-y-6">
      {state.error && (
        <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="password">
            Nytt lösenord
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

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="confirm_password">
            Bekräfta nytt lösenord
          </label>
          <Input
            autoComplete="new-password"
            id="confirm_password"
            minLength={8}
            name="confirm_password"
            placeholder="Upprepa lösenord"
            required
            type="password"
          />
        </div>

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Sparar…" : "Spara nytt lösenord"}
        </Button>
      </form>
    </div>
  );
}
