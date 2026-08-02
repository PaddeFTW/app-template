"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export interface SignInState {
  error?: string;
}

export async function signIn(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/app/dashboard";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Normalise Supabase error messages for end users
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Incorrect email or password." };
    }
    if (error.message.includes("Email not confirmed")) {
      return {
        error:
          "Please verify your email address before signing in. Check your inbox.",
      };
    }
    return { error: error.message };
  }

  redirect(redirectTo);
}
