# Design System

## Overview

The starter uses a semantic token model from the v0 **Modern Minimal** theme. Components consume shared meanings such as `background`, `foreground`, `primary`, `border`, `muted`, and `sidebar`.

Tokens are implemented in `app/globals.css` and documented in `lib/design-tokens.ts`.

## Design Principles

1. Semantic before decorative.
2. Reuse before specialization.
3. Calm, precise, and minimal over flashy.
4. Accessible contrast and readable hierarchy by default.
5. Motion should guide, not distract.

Product-level UX decisions should also follow `docs/PRODUCT_PRINCIPLES.md`.

## Source

Theme: v0 Modern Minimal (Default)

- Font sans: Inter
- Font serif: Source Serif 4
- Font mono: Geist Mono
- Radius: `0.375rem`
- Shadow: `0 1px 2px 0 #0000000d`

## Colors

| Token | Value |
| --- | --- |
| Primary | `#3b82f6` |
| Primary Foreground | `#ffffff` |
| Secondary | `#f3f4f6` |
| Secondary Foreground | `#4b5563` |
| Accent | `#e0f2fe` |
| Accent Foreground | `#1e3a8a` |
| Background | `#ffffff` |
| Foreground | `#333333` |
| Card | `#ffffff` |
| Card Foreground | `#333333` |
| Popover | `#ffffff` |
| Popover Foreground | `#333333` |
| Muted | `#f9fafb` |
| Muted Foreground | `#6b7280` |
| Destructive | `#ef4444` |
| Destructive Foreground | `#ffffff` |
| Border | `#e5e7eb` |
| Input | `#e5e7eb` |
| Ring | `#3b82f6` |
| Chart 1 | `#3b82f6` |
| Chart 2 | `#2563eb` |
| Chart 3 | `#1d4ed8` |
| Chart 4 | `#1e40af` |
| Chart 5 | `#1e3a8a` |
| Sidebar | `#f9fafb` |
| Sidebar Foreground | `#333333` |
| Sidebar Primary | `#3b82f6` |
| Sidebar Primary Foreground | `#ffffff` |
| Sidebar Accent | `#e0f2fe` |
| Sidebar Accent Foreground | `#1e3a8a` |
| Sidebar Border | `#e5e7eb` |
| Sidebar Ring | `#3b82f6` |

Dark mode keeps the same semantic names with inverted surfaces.

## Typography

- Sans: Inter
- Serif: Source Serif 4
- Mono: Geist Mono

Use Inter for UI. Use Source Serif 4 for long-form document content. Use Geist Mono for code and technical labels.

## Radius

Base radius is `0.375rem`. Prefer token radii over ad hoc rounding.

## Shadows

Default elevation is a single soft shadow:

```text
0 1px 2px 0 #0000000d
```

Keep elevation subtle.

## Layout

Dashboard and sidebar are the standard application shell. Use `DashboardLayout` and `Sidebar` unless a screen clearly needs `DocumentLayout` or `SettingsLayout`.

## Theme Strategy

- light mode (default Modern Minimal)
- dark mode (same tokens, inverted surfaces)
- future branded theme packs via CSS variables

## Component Guidance

- `components/ui/` — small, reusable primitives
- `components/common/` — neutral compositions
- `components/layout/` — shell structure, not workflow behavior

## Extension Rules

- add new tokens only when multiple products need them
- avoid embedding product names in global tokens
- keep primitives generic
- create product-level variants outside the template when only one application needs them
