# Extending the Template

## Add a New Product Module

When a future application grows beyond the starter:

1. keep shared code in the existing platform folders
2. create module-specific folders for domain code
3. compose layouts and primitives instead of editing them unnecessarily

## Decide Where New Code Belongs

Use this rule of thumb:

- `components/ui/` for low-level generic primitives
- `components/common/` for neutral cross-product compositions
- `components/layout/` for shell structure
- product modules for business-specific code

## Token Changes

Only add or rename tokens when:

- multiple applications need the change
- the token is semantic
- the token does not leak product language

## Documentation Updates

Any shared architectural or design-system change should update:

- `README.md`
- `DESIGN_SYSTEM.md`
- `ARCHITECTURE.md`
- any affected files in `docs/`
