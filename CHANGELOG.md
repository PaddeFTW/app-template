# Changelog

## 0.3.0

- Added generic auth and company foundation: `/login`, `/skapa-konto`, `/valkommen`.
- `CompanyProfile` stores organisation number. Smart Workspace still receives `CompanyContext` without it.
- LocalAuthAdapter for template demo. Products replace the adapter with Supabase.

## 0.2.0

- Replaced the previous theme with the v0 Modern Minimal design system.
- Renamed the template to **app**. Removed Quality WorX branding.
- Documented dashboard and sidebar as the standard application shell.

## 0.1.0

Initial starter foundation release.

Included:

- Next.js and TypeScript bootstrap
- Tailwind and semantic token setup
- shadcn/ui-compatible component structure
- reusable layout shells
- neutral UI primitives and states
- platform documentation set

## 2026-10-13
- Modern 2027 design: cyan/violet palette, glass effects, larger radius, refined shadows
- Language selector with 12 languages (top global + Swedish/English)
- Enhanced Smart Workspace floating button (gradient, cooler AI vibe)
- i18n foundation in lib/i18n.ts
