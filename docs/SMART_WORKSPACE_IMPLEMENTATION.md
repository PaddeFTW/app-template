# Smart Workspace implementation

Smart Workspace is an optional shared layer in the template. Apps provide a `WorkspaceAppContract` with context, writable fields, and an `applyFieldUpdates` callback. The template creates a reviewable proposal from free text, shows old/new values and source levels, and only calls the app callback after explicit approval.

## Demo

`SmartWorkspacePanel` uses the deterministic `createDemoProposal` mapper by default. It recognizes the generic showcase scenario without a knowledge base, retrieval, external model, automatic actions, or persistence. Replace the mapper behind the same proposal contract when an app needs a server-side implementation.

## Safety boundaries

- `workspace_enabled: false` renders no floating button.
- `ai_writable: false` fields are never proposed.
- No proposal is applied without explicit user approval.
- V1 supports field updates only; actions are typed but not executable.
- Undo is available while the proposal remains in memory.
