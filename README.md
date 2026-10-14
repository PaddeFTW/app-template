# app-template

Official starter template for Quality Works applications.

Foundation for future apps built with Grok + v0, Supabase, downloadable EXE, and SQL migrations.

## Core idea

Before every module: guided questions generate material → Smart Workspace for review/approve → publish into the module.

## Design

- **Light**: Indigo/violet, soft layered shadows, airy surfaces (from onboarding-app).
- **Dark**: High-contrast Laser Tech (#00E5FF primary, deep blacks, high readability).
- 12 languages (en, sv, es, fr, de, pt, zh, ja, ar, ru, hi, it).

## Knowledge

Basic ISO terms (9001, 14001, 45001, 27001 + common) live in `docs/knowledge-base/`. Use simple Swedish. Say "krav" and "avsnitt", never "klausul".

## Tech

Next.js, TypeScript, Tailwind, shadcn/ui, Radix, Lucide.

## Structure

```text
app/
components/common/   # GuidedSmartEntry, SmartWorkspace, states
components/layout/   # Dashboard, Sidebar, Topbar
docs/knowledge-base/ # ISO term modules
lib/                 # i18n, tokens, workspace
```

## Getting started

```bash
npm install
npm run dev
```

Clone and extend. Domain logic stays outside the starter.
