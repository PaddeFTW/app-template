# App Template

A brand-neutral starter template for building modern web applications.

This repository is intentionally a foundation, not a product. It provides the shared architecture, design tokens, layout shells, UI primitives, and documentation standards that every future application can extend.

## Principles

- Build once at the platform layer, reuse across products.
- Prefer composition over feature-specific abstractions.
- Keep domain logic out of the starter.
- Document decisions so future teams can move fast without guesswork.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui-compatible structure
- Radix UI
- Lucide React

## Included Foundation

- semantic design token system
- reusable layout shells
- neutral UI primitives
- reusable page states
- theme-ready light and dark styling
- platform architecture documentation

## Folder Structure

```text
app/
components/
  common/
  layout/
  ui/
docs/
hooks/
lib/
public/
styles/
types/
```

## Primary Layout Shells

- `AppLayout`
- `DashboardLayout`
- `DocumentLayout`
- `SettingsLayout`

## Core UI Primitives

- `Button`
- `Card`
- `Input`
- `Textarea`
- `Select`
- `Dialog`
- `Table`
- `Badge`
- `Progress`

## Shared Presentation Components

- `Sidebar`
- `Topbar`
- `Breadcrumb`
- `PageHeader`
- `EmptyState`
- `LoadingState`
- `ErrorState`

## Documentation

- `PROJECT_BRIEF.md`
- `DESIGN_SYSTEM.md`
- `ARCHITECTURE.md`
- `ROADMAP.md`
- `CHANGELOG.md`
- `AGENTS.md`
- `docs/PRODUCT_TEMPLATE_RULES.md`
- `docs/`

## Getting Started

```bash
npm install
npm run dev
```

## Non-Goals

This template does not include:

- business workflows
- product-specific routes
- data models
- API integrations
- product-specific module logic

Future applications should clone this repository and add those concerns on top of the shared foundation.
