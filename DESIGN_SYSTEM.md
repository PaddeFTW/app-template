# Design System

## Overview

The starter foundation uses a semantic design token model rather than hardcoded product styling. Components consume shared meanings such as `background`, `foreground`, `primary`, `border`, and `muted`, which makes future branding and theming easier.

## Design Principles

1. Semantic before decorative.
2. Reuse before specialization.
3. Calm, precise, and premium over flashy.
4. Accessible contrast and readable hierarchy by default.
5. Motion should guide, not distract.

Product-level UX decisions for future applications should also follow `docs/PRODUCT_TEMPLATE_RULES.md`, especially the principles for guided workflows, progressive disclosure, mobile-first use, and positive productivity.

## Token Categories

### Colors

The template defines semantic colors for:

- background
- foreground
- card
- popover
- primary
- secondary
- muted
- accent
- success
- warning
- destructive
- border
- input
- ring
- sidebar
- surface
- surface-elevated

These are implemented in `app/globals.css` and documented in `lib/design-tokens.ts`.

### Spacing

Spacing is prepared as a small foundational scale to keep shells and components consistent. Future products should prefer existing rhythm before introducing one-off spacing values.

### Radius

A shared radius system gives the platform its visual softness. Components should prefer token-based radii over ad hoc rounding.

### Shadows

Elevation is intentionally subtle and optimized for premium SaaS surfaces rather than strong card stacking.

### Typography

The default typographic approach prioritizes:

- clean heading hierarchy
- strong legibility
- compact but comfortable dense-interface rhythm

### Animations

Motion tokens exist for fast, base, and slow transitions. Use them to preserve a unified interaction feel.

## Theme Strategy

The foundation is ready for:

- light mode
- dark mode
- future branded theme packs

Theme values are implemented with CSS variables and consumed through Tailwind-friendly semantic utilities.

## Component Guidance

### UI primitives

`components/ui/` should remain small, focused, and reusable. These files are the platform’s base building blocks.

### Common components

`components/common/` should contain neutral compositions that appear in many products, such as state components and headers.

### Layout components

`components/layout/` should define shell structure, not workflow behavior.

## Visual Direction

The interface language should feel closer to modern premium SaaS products such as Notion, Linear, and Stripe:

- restrained color usage
- crisp spacing
- subtle shadows
- refined borders
- strong content hierarchy

## Extension Rules

- add new tokens only when multiple products need them
- avoid embedding module-specific names in global tokens
- keep primitives generic
- create product-level variants outside the template when only one application needs them
