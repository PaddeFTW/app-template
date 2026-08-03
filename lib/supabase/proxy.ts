import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Refreshes the Supabase session cookie and returns the response.
 * Must be called from proxy.ts (project root) on every request so
 * the session token never expires silently.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: getClaims() reads the JWT directly from the cookie without
  // making a network request to Supabase Auth — safe and fast for route
  // protection. Never use getSession() here as it can be spoofed.
  // Use getUser() only in Server Actions / Server Components that need a
  // verified, up-to-date user record from the Auth server.
  const { data, error } = await supabase.auth.getClaims();
  const isAuthenticated = !error && data?.claims?.sub != null;

  const { pathname } = request.nextUrl;

  // Authenticated user trying to access auth pages → redirect to dashboard
  const isAuthPage = pathname.startsWith("/auth");
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }

  // Unauthenticated user trying to access protected pages → redirect to login
  const isProtectedPage = pathname.startsWith("/app");
  if (isProtectedPage && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}
