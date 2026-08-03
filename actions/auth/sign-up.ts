"use server";

import { redirect } from "next/navigation";

import { getRedirectUrl } from "@/lib/app-url";
import { createClient } from "@/lib/supabase/server";

export interface SignUpState {
  error?: string;
  success?: boolean;
}

export async function signUp(
  _prev: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;

  if (!email || !password || !fullName) {
    return { error: "All fields are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const redirectUrl = getRedirectUrl();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${redirectUrl}/auth/confirm?next=/auth/verify-email`,
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/auth/verify-email");
}
