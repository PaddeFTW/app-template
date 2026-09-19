# AGENTS

This repository is the shared foundation for future applications. The product name is **app**. AI agents and contributors should preserve that intent.

## Core Rules

1. Do not turn this repository into a product-specific application.
2. Do not add business workflows, domain models, or feature logic that only belongs to one product.
3. Prefer reusable architecture, neutral naming, and composable UI.
4. Update documentation whenever shared structure or conventions change.
5. Keep additions aligned with the Modern Minimal token system and layout strategy.
6. Use dashboard and sidebar as the default shell.

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
- reintroducing product brand names into the template

## When Adding New Shared Code

Ask:

- will more than one future product benefit from this?
- is the naming neutral?
- does this belong in `ui`, `common`, `layout`, or product code?
- does the documentation still match the implementation?

If the answer is not clearly shared platform value, it likely does not belong in this template.
