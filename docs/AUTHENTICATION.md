# Authentication

This guide covers the Supabase authentication system, session management, and route protection.

## Overview

- **Auth Provider:** Supabase Auth (native)
- **Session Storage:** HTTP-only cookies
- **Session Refresh:** Automatic via `proxy.ts` on every request
- **Route Protection:** `proxy.ts` checks session validity
- **Protected Routes:** `/app/*` (redirects to `/auth/login` if unauthenticated)
- **Public Routes:** `/`, `/auth/*`

## Environment Variables

| Variable | Purpose | Required | Production |
|----------|---------|----------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes | Yes |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public API key | Yes | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key (server-side only) | For account deletion | Yes |
| `NEXT_PUBLIC_APP_URL` | Application base URL | No | **Yes** |

### `NEXT_PUBLIC_APP_URL` — Email Redirect Links

Used in all email flows (sign-up, magic link, password reset). In development, defaults to `http://localhost:3000` if not set. **In production, you must set this to your deployed domain** (e.g., `https://app.example.com`).

```bash
# Development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Production
NEXT_PUBLIC_APP_URL=https://app.example.com
```

## Authentication Flows

### Sign-Up (Email + Password)

1. User submits email, password, full name
2. `actions/auth/sign-up.ts` sends data to Supabase
3. Supabase creates user + `public.user_profiles` row (auto via trigger)
4. Confirmation email sent to user (with link to `/auth/confirm`)
5. User clicks email link → `app/auth/callback/route.ts` exchanges token → session created
6. User redirected to `/app/dashboard`

**Endpoint:** `POST /api/auth/sign-up` (Server Action)  
**Email Recipient:** User's email address  
**Redirect URL:** `{NEXT_PUBLIC_APP_URL}/auth/confirm`

### Sign-In (Email + Password)

1. User submits email + password
2. `actions/auth/sign-in.ts` calls `signInWithPassword()`
3. On success: session created, redirect to `/app/dashboard`
4. On error: error message shown

**Endpoint:** `POST /api/auth/sign-in` (Server Action)

### Magic Link

1. User submits email
2. `actions/auth/magic-link.ts` calls `signInWithOtp()`
3. Supabase sends magic link email
4. User clicks email link → `app/auth/callback/route.ts` exchanges token → session created
5. User redirected to `/app/dashboard`

**Endpoint:** `POST /api/auth/magic-link` (Server Action)  
**Email Recipient:** User's email address  
**Redirect URL:** `{NEXT_PUBLIC_APP_URL}/auth/confirm`

### Forgot Password

1. User submits email
2. `actions/auth/forgot-password.ts` calls `resetPasswordForEmail()`
3. Supabase sends password reset email
4. User clicks email link → `app/auth/callback/route.ts` exchanges token → redirect to `/auth/reset-password`
5. User submits new password
6. `actions/auth/reset-password.ts` calls `updateUser()` with new password
7. Session created, redirect to `/auth/login`

**Endpoint (request):** `POST /api/auth/forgot-password` (Server Action)  
**Endpoint (reset):** `POST /api/auth/reset-password` (Server Action)  
**Email Recipient:** User's email address  
**Redirect URL:** `{NEXT_PUBLIC_APP_URL}/auth/confirm`

### OAuth (Social Login)

When configured in Supabase Dashboard:

1. User clicks provider button (Google, Microsoft, etc.)
2. `components/auth/social-login-buttons.tsx` calls `signInWithOAuth()`
3. User is redirected to provider
4. After authorization, provider redirects to `{NEXT_PUBLIC_APP_URL}/auth/callback?code=...`
5. `app/auth/callback/route.ts` exchanges code for session
6. User redirected to `/app/dashboard`

**Callback URL:** `{NEXT_PUBLIC_APP_URL}/auth/callback`

### Sign Out

1. User clicks logout
2. `actions/auth/sign-out.ts` calls `signOut()`
3. Session cookie cleared
4. User redirected to `/auth/login`

**Endpoint:** `POST /api/auth/sign-out` (Server Action)

### Account Deletion

1. User requests account deletion
2. `components/account/delete-account-dialog.tsx` calls `/api/auth/delete-account`
3. Route Handler verifies session, then uses `admin.deleteUser()` (service role)
4. User record + all related data deleted
5. Session cleared
6. User redirected to `/`

**Endpoint:** `DELETE /api/auth/delete-account` (Route Handler, server-side only)

## Session Management

### How It Works

- Sessions are stored in HTTP-only cookies managed by Supabase
- `proxy.ts` runs on every request to refresh the session
- `createServerClient()` from `@supabase/ssr` handles cookie reads/writes
- Session tokens never expire silently — they're refreshed on each request

### Reading the Current User

**In Server Components / Server Actions:**
```typescript
const supabase = await createClient(); // from lib/supabase/server.ts
const { data: { user } } = await supabase.auth.getUser();
```

**In Route Handlers:**
```typescript
const supabase = createServerClient(...);
const { data: { user } } = await supabase.auth.getUser();
```

**In Browser Context:**
```typescript
const supabase = createClient(); // from lib/supabase/client.ts
const { data: { session } } = await supabase.auth.getSession();
```

Never use `getSession()` for security checks on the server — it reads from local storage and can be spoofed. Use:
- `getClaims()` in `proxy.ts` / middleware — reads JWT from cookie locally, no network request
- `getUser()` in Server Actions / Server Components — makes a network request to verify the user with Supabase Auth

## Route Protection

Protected routes are enforced at the proxy level in `lib/supabase/proxy.ts`:

```
GET /app/* (no session) → redirect to /auth/login?redirectTo=/app/...
GET /auth/* (with session) → redirect to /app/dashboard
GET /* (no auth routes) → allowed
```

The proxy uses `getClaims()` to read the JWT directly from the session cookie without making a network request, making it fast and secure. `getUser()` makes a network request to the Supabase Auth server and should only be used in Server Actions or Server Components that need a verified, up-to-date user record.

## Database Schema

When a new user signs up, the `public.user_profiles` table is auto-populated via a trigger:

```sql
-- Auto-created when user signs up
INSERT INTO public.user_profiles (id, full_name)
VALUES (user.id, user.raw_user_meta_data->>'full_name');
```

Users can only access their own profile row via RLS policies.

## Security Considerations

1. **Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser** — Only used in `/api/auth/delete-account`
2. **Never use `getSession()` for server-side auth checks** — Use `getClaims()` in proxy/middleware (no network request) or `getUser()` in Server Actions (verified network request)
3. **Email confirmation is required for sign-up** — Verify `email_confirmed_at` is not null before allowing login
4. **Session tokens are short-lived** — Refresh happens automatically via proxy on each request
5. **Passwords are hashed by Supabase** — Never hash client-side
6. **Magic links expire after 24 hours** — Users must request a new link if they don't click within 24 hours
7. **OAuth credentials are never exposed** — The authorization code is exchanged server-side only

## Troubleshooting

### User cannot receive confirmation email
- Check `NEXT_PUBLIC_APP_URL` is correct
- Verify email is configured in Supabase Dashboard
- Check spam/junk folders
- Look for errors in `NEXT_PUBLIC_SUPABASE_REDIRECT_URL` construction

### Session expires immediately
- Verify cookies are enabled in browser
- Check `@supabase/ssr` is installed
- Ensure proxy.ts is running on every request

### OAuth callback fails
- Verify callback URL in Supabase OAuth provider settings
- Check `NEXT_PUBLIC_APP_URL` matches the registered callback URL
- Ensure provider credentials are configured in Supabase Dashboard

### User can access /app without logging in
- Verify `proxy.ts` is in project root
- Check proxy matcher config includes `/app/*`
- Ensure `createServerClient()` is initialized correctly in proxy
