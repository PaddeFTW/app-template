import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Återställ lösenord",
};

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Återställ ditt lösenord
        </h1>
        <p className="text-sm text-muted-foreground">
          Ange din e-postadress så skickar vi en återställningslänk.
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
