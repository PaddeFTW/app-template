import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Nytt lösenord",
};

export default function ResetPasswordPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Välj ett nytt lösenord
        </h1>
        <p className="text-sm text-muted-foreground">
          Välj ett nytt lösenord för ditt konto.
        </p>
      </div>

      <ResetPasswordForm />
    </div>
  );
}
