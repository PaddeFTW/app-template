import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verifiera din e-post",
};

interface VerifyEmailPageProps {
  searchParams: Promise<{ type?: string; email?: string }>;
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = await searchParams;
  const isMagicLink = params.type === "magic-link";
  const email = params.email;

  return (
    <div className="space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isMagicLink ? "Kontrollera din inkorg" : "Verifiera din e-post"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isMagicLink
            ? `Vi skickade en inloggningslänk till ${email ?? "din e-postadress"}. Klicka på den för att fortsätta.`
            : "Vi skickade en verifieringslänk till din e-postadress. Klicka på den för att aktivera ditt konto."}
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 text-left text-sm text-muted-foreground space-y-2">
        <p className="font-medium text-foreground">Fick du inget e-postmeddelande?</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Kontrollera din skräppost eller skräppostmapp.</li>
          <li>Se till att du angav rätt e-postadress.</li>
          <li>Vänta en minut och försök igen.</li>
        </ul>
      </div>

      <Link
        className="inline-block text-sm text-primary hover:underline"
        href="/auth/login"
      >
        Tillbaka till inloggning
      </Link>
    </div>
  );
}
