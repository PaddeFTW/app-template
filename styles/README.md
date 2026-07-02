# Styles and Tokens

This directory exists to document and extend the global styling system beyond `app/globals.css`.

## Current source of truth

- `app/globals.css` defines runtime CSS variables and theme mappings
- `lib/design-tokens.ts` documents the token contract in TypeScript

## Intended future use

Add files here when the shared platform grows into:

- additional theme packs
- motion presets
- print styles
- editor-specific styles
- token export scripts

Keep all additions generic and reusable across Quality WorX products.
