import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verify your email",
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
          {isMagicLink ? "Check your inbox" : "Verify your email"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isMagicLink
            ? `We sent a sign-in link to ${email ?? "your email address"}. Click it to continue.`
            : "We sent a verification link to your email address. Click it to activate your account."}
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 text-left text-sm text-muted-foreground space-y-2">
        <p className="font-medium text-foreground">Did not receive the email?</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Check your spam or junk folder.</li>
          <li>Make sure you entered the correct email address.</li>
          <li>Wait a minute and try again.</li>
        </ul>
      </div>

      <Link
        className="inline-block text-sm text-primary hover:underline"
        href="/auth/login"
      >
        Back to sign in
      </Link>
    </div>
  );
}
