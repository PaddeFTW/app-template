import { AuthShell } from "@/components/auth/auth-shell";
import { WelcomeForm } from "@/components/auth/welcome-form";

export default function ValkommenPage() {
  return (
    <AuthShell description="Du är inloggad. Skriv företagsnamn och org.nr om du har det." title="Vad heter företaget?">
      <WelcomeForm />
    </AuthShell>
  );
}
