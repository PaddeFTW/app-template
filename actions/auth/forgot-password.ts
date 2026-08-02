"use server";

import { createClient } from "@/lib/supabase/server";

export interface ForgotPasswordState {
  error?: string;
  success?: boolean;
}

export async function requestPasswordReset(
  _prev: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required." };
  }

  const redirectUrl =
    process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
    `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${redirectUrl}?next=/auth/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  // Always return success to avoid email enumeration
  return { success: true };
}
