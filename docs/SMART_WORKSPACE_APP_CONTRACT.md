# Smart Workspace App Contract

**Version:** 1.0  
**Status:** FÖRESLAGET  
**Datum:** 2026-09-28  
**För:** utvecklare av en ny app ovanpå app-template

---

## Vad appen måste leverera

En app som vill använda Smart Workspace implementerar **ett objekt** och **två callbacks**.

```ts
type WorkspaceAppContract = {
  app_id: string;
  app_name: string;
  workspace_enabled: boolean;
  locale: string;
  getContext(): WorkspaceContext;
  applyFieldUpdates(input: ApplyFieldUpdatesInput): Promise<ApplyFieldUpdatesResult>;
  knowledge?: KnowledgeAdapter;
  usage?: UsagePort;
  actions?: ActionContract[];
};
```

Om `workspace_enabled` är `false` renderas ingen knapp.

---

## WorkspaceContext

```ts
type WorkspaceContext = {
  app_id: string;
  app_name: string;
  locale: "sv" | "en";
  module_id?: string;
  page_id?: string;
  section_id?: string;
  step_id?: string;
  record_id: string | null;
  user_role?: string;
  permissions: {
    canOpenWorkspace: boolean;
    canApplyWorkspace: boolean;
  };
  fields: FieldInstance[];
};
```

`FieldInstance` = FieldContract + `value` + `disabled?`.

### Vilka fält som verkligen behövs i V1

| Fält | Krav | Varför |
|---|---|---|
| app_id | obligatoriskt | isolera appar |
| app_name | obligatoriskt | UI-rubrik |
| locale | obligatoriskt | språk i panelen |
| record_id | obligatoriskt (kan vara null) | vet om det finns något att uppdatera |
| fields | obligatoriskt | utan fält ingen mappning |
| permissions | obligatoriskt | granskare ska kunna öppna men inte applicera |
| module_id / page_id / step_id | rekommenderat | multi-modul och hjälptext |
| user_role | valfritt | bara om appen vill styra copy |
| section_id | valfritt | V2 |

Appen skickar **aktuella värden**, inte hela databasen.

---

## Callbacks

### applyFieldUpdates

```ts
type ApplyFieldUpdatesInput = {
  record_id: string;
  proposal_id: string;
  changes: Array<{
    field_id: string;
    new_value: unknown;
  }>;
};

type ApplyFieldUpdatesResult = {
  ok: boolean;
  applied_field_ids: string[];
  error?: string;
};
```

Appen validerar mot egna regler. Template litar inte på att förslaget är giltigt.

### KnowledgeAdapter och UsagePort

Valfria. Default: no-op. Se adapter- och foundation-dokumenten.

---

## ActionContract (schema nu, execute senare)

```ts
type ActionContract = {
  id: string;
  label: string;
  type:
    | "create"
    | "update"
    | "delete"
    | "navigate"
    | "createActivity"
    | "addComment"
    | "generateSummary";
  enabled: boolean;
  requires_confirmation: boolean;
  allowed_in_v1: false;
};
```

V1 får lista actions i kontraktet men **inte** köra dem. Inget underlag i KB-standarden för automatiska actions i Version 1.

---

## Minimal implementation för en ny utvecklare

1. Sätt `workspace_enabled: true` på sidor där det ger värde.  
2. Beskriv fälten i ett FieldContract.  
3. Returnera `getContext()` med current values.  
4. Implementera `applyFieldUpdates`.  
5. Lämna `knowledge` och `usage` tomma tills produkten behöver dem.

Det är allt för V1.

---

## Handoff-koppling

PRODUCT_APP_HANDOFF_TEMPLATE §9 ska fyllas i per produkt:

- Ska användas: Ja / Nej / Delvis
- Syfte
- Inbyggd eller fokuserad vy
- Begränsningar i Version 1

Denna mall ersätter inte handoff. Den är det tekniska kontraktet bakom kryssrutan.
