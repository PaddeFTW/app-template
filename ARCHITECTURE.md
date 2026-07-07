# Architecture

## Philosophy

This repository separates platform foundation concerns from application concerns.

Future product architecture should also be guided by `docs/QUALITY_WORX_PRODUCT_PRINCIPLES.md`. In particular, the platform language should use `Guided Workflow Engine` as the reusable architectural concept; quiz-style screens are only one possible UI pattern inside that broader approach.

The foundation should answer:

- how shared UI is structured
- how themes and tokens are applied
- how layouts are composed
- how future teams should organize code

It should not answer:

- how a specific Quality WorX product behaves
- which business entities exist
- what workflows a module requires

## Directory Map

```text
app/                Next.js entrypoints and global styles
components/ui/      low-level reusable UI primitives
components/layout/  shell and layout compositions
components/common/  shared neutral presentation components
hooks/              reusable client hooks
lib/                utilities, config, and token references
styles/             future styling extensions and guidance
types/              shared TypeScript contracts
public/             static assets
docs/               implementation guidance and extension docs
```

## Layering Rules

1. `components/ui/` may depend on `lib/` and `types/`.
2. `components/common/` may depend on `components/ui/`, `lib/`, and `types/`.
3. `components/layout/` may depend on `components/ui/`, `components/common/`, `lib/`, and `types/`.
4. `app/` may compose any of the above layers.
5. Product-specific code should be added later without polluting the shared base.

## Layout Strategy

The template provides four shell patterns:

- `AppLayout` for general application shell composition
- `DashboardLayout` for overview and operational pages
- `DocumentLayout` for structured long-form content
- `SettingsLayout` for preference and configuration surfaces

These layouts intentionally stop at structure and presentation.

## Theming Strategy

The design system is implemented through CSS custom properties in `app/globals.css` and mirrored in `lib/design-tokens.ts` for discoverability.

This enables:

- theme switching
- semantic styling
- future branding
- consistent surfaces across products

## Routing Strategy

The starter uses the Next.js App Router.

The root route exists only to demonstrate the foundation. Future applications can replace or extend it with product-specific route groups while preserving the shared shell and token system.

## Component Strategy

- keep primitives small
- prefer composition over inheritance
- avoid coupling primitives to product language
- use wrappers only when they add shared platform value

## Future Expansion

Future applications should introduce product code in dedicated route groups or module folders while preserving the platform layers above as stable shared infrastructure.
