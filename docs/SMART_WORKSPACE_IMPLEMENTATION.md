# Smart Workspace implementation

Smart Workspace is an optional shared layer in the template. Apps provide a `WorkspaceAppContract` with context, writable fields, and an `applyFieldUpdates` callback. The template creates a reviewable proposal from free text, shows old/new values and source levels, and only calls the app callback after explicit approval.

## Demo

`SmartWorkspacePanel` uses the deterministic `createDemoProposal` mapper by default. It recognizes the generic showcase scenario without a knowledge base, retrieval, external model, automatic actions, or persistence. Replace the mapper behind the same proposal contract when an app needs a server-side implementation.

## Company context (V1.1)

`WorkspaceContext.company` is optional. The template does not persist a company profile and does not store organisation numbers in workspace types. Product apps map their own profile down to `CompanyContext` (`display_name`, `industry`, `size_band`, `standard_ids`).

`toKnowledgeQuery(ctx)` copies those fields onto `KnowledgeQuery` for a future adapter. V1.1 still uses `NoopAdapter`. Changing company context must not rewrite existing records.

## Safety boundaries

- `workspace_enabled: false` renders no floating button.
- `ai_writable: false` fields are never proposed.
- No proposal is applied without explicit user approval.
- V1 supports field updates only; actions are typed but not executable.
- Undo is available while the proposal remains in memory.
