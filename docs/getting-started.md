# Getting Started

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Validate

```bash
npm run lint
npm run typecheck
npm run build
```

## First Extension Steps

1. Replace the root showcase with your product routes.
2. Keep shared primitives in `components/ui/`.
3. Add product-specific modules outside the shared platform layer.
4. Extend tokens only when the change benefits multiple applications.

## Recommended Approach

Start by defining your product route groups and module boundaries, then compose them using the provided layout shells rather than modifying the foundation directly.
