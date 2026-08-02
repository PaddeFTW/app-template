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
            New password
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

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="confirm_password">
            Confirm new password
          </label>
          <Input
            autoComplete="new-password"
            id="confirm_password"
            minLength={8}
            name="confirm_password"
            placeholder="Repeat password"
            required
            type="password"
          />
        </div>

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Saving…" : "Save new password"}
        </Button>
      </form>
    </div>
  );
}
