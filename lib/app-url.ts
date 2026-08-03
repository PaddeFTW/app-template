/**
 * Get the base URL for the application.
 * 
 * Priority:
 * 1. NEXT_PUBLIC_APP_URL — production and explicit configuration
 * 2. window.location.origin — browser context (safe fallback)
 * 3. http://localhost:3000 — development fallback only
 * 
 * Never hardcodes v0, GitHub, or Vercel URLs.
 */
export function getAppUrl(): string {
  // Production or explicit configuration
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // Browser context (safe to use window.location)
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }

  // Server-side fallback during build or without explicit config
  return 'http://localhost:3000';
}

/**
 * Get the full redirect URL for Supabase email flows.
 * 
 * Used in:
 * - Sign-up email confirmation
 * - Magic link authentication
 * - Password reset
 */
export function getRedirectUrl(): string {
  const baseUrl = getAppUrl();
  return `${baseUrl}/auth/confirm`;
}
