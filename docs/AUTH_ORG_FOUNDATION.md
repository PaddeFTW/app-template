# Auth and company foundation

Generic account layer for every app built on this template.

## What this is

- `/login`
- `/skapa-konto`
- `/valkommen`
- `AuthSession`
- `CompanyProfile` (includes `org_number`)
- `AuthAdapter`
- `LocalAuthAdapter` for the template showcase

## What this is not

- Quality Works modules
- manuals created at signup
- Stripe, Swish, credits, plans
- ISO text
- organisation number on `WorkspaceContext.company`

## Mapping

`CompanyProfile.org_number` stays on the company record.
`toCompanyContext(profile)` strips it before Smart Workspace.

## How a product switches to Supabase

1. Keep the pages and forms.
2. Replace `authAdapter` in `lib/auth/adapter.ts` with a Supabase implementation.
3. Use `docs/AUTH_ORG_SCHEMA.sql`.
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Do not copy Quality Works Light billing or manual bootstrap into the adapter.
