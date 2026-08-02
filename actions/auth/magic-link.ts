"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export interface MagicLinkState {
  error?: string;
  success?: boolean;
}

export async function requestMagicLink(
  _prev: MagicLinkState,
  formData: FormData,
): Promise<MagicLinkState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required." };
  }

  const redirectUrl =
    process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
    `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${redirectUrl}?next=/app/dashboard`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect(`/auth/verify-email?type=magic-link&email=${encodeURIComponent(email)}`);
}
