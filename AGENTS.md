# AGENTS

This repository is the shared foundation for future Quality WorX applications. AI agents and contributors should preserve that intent.

## Base44 Dev Environment

- **Stack:** Next.js 16 (Turbopack) + React 19 + Tailwind CSS 4 + shadcn/ui-compatible primitives. Pure frontend template — no backend, no database, no external services.
- **Run:** `docker compose -f docker-compose.base44.yml up -d` starts a `node:22` container that bind-mounts the source, runs `npm install` on boot, then `next dev` on port 3000. Live reload is enabled (polling mode for bind mounts).
- **Preview origin:** `next.config.ts` reads `BASE44_PUBLIC_HOST_SUFFIX` and adds `3000-<suffix>` to `allowedDevOrigins` so the preview's external origin can load dev assets/HMR. Do not hardcode the suffix.
- **Verify:** `curl -sf -H "Host: 3000-$BASE44_PUBLIC_HOST_SUFFIX" http://localhost:3000/` returns 200 with the "Quality WorX Platform Foundation" page.
- **No secrets required** to boot.

## Core Rules

1. Do not turn this repository into a product-specific application.
2. Do not add business workflows, domain models, or feature logic that only belongs to one product.
3. Prefer reusable architecture, neutral naming, and composable UI.
4. Update documentation whenever shared structure or conventions change.
5. Keep additions aligned with the design token system and layout strategy.

## Preferred Contribution Shape

- improve shared primitives
- improve shared layouts
- refine design tokens
- improve accessibility
- improve documentation
- improve developer experience for future app teams

## Avoid

- feature-specific pages
- business-specific tables or forms
- mock domain entities presented as real platform concepts
- hardcoded brand decisions that cannot be themed later

## When Adding New Shared Code

Ask:

- will more than one future Quality WorX product benefit from this?
- is the naming neutral?
- does this belong in `ui`, `common`, `layout`, or product code?
- does the documentation still match the implementation?

If the answer is not clearly shared platform value, it likely does not belong in this template.
