# Smart Workspace Knowledge Adapter

**Version:** 1.0  
**Status:** FÖRESLAGET  
**Datum:** 2026-09-28  
**Följer:** SMART_WORKSPACE_KNOWLEDGE_STANDARD.md, APP_CONTENT_DELIVERY_STANDARD.md  
**Bygger inte:** ny fackkunskap

---

## Syfte

Adaptern är den enda vägen mellan Workspace och kunskap.

Template äger gränssnittet. Appen äger vilken kunskap som är tillåten.

---

## Tre lägen

| Läge | När | Adapter |
|---|---|---|
| A. Ingen KB | timer, kalkyl, intern demo | `NoopAdapter` |
| B. App-lokal KB | en produkt, t.ex. en utredningsapp | `StaticAdapter` eller filbaserad adapter mot produktens `processed/` |
| C. Gemensam KB | multi-modul-plattform | samma gränssnitt, annan implementation som läser tagged release |

UI och Proposal är identiska i A–C. Bara `sources.level = knowledge` fylls i B och C.

---

## Gränssnitt

```ts
type KnowledgeQuery = {
  app_id: string;
  locale: string;
  module_id?: string;
  page_id?: string;
  step_id?: string;
  field_ids: string[];
  text?: string;
  allowed_domains: string[];
  allowed_knowledge_ids?: string[];
  kb_version?: string;
  audience?: string;
};

type KnowledgeHit = {
  knowledge_id: string;
  title: string;
  content_type: string;
  simple_text?: string;
  professional_text?: string;
  source_ids: string[];
  version?: string;
  status: string;
  score?: number;
};

type KnowledgeAdapter = {
  retrieve(query: KnowledgeQuery): Promise<KnowledgeHit[]>;
};
```

`NoopAdapter.retrieve` returnerar `[]`.

V1 anropar inte retrieve i produktionsflödet om inte appen sätter en adapter. Demoappen kan returnera hårdkodade hits utan ISO-text, t.ex. hjälp för fältet `customer_name`.

---

## Vad appen anger

I App Contract:

```ts
type KnowledgeBinding = {
  adapter: KnowledgeAdapter;
  allowed_domains: string[];
  allowed_knowledge_ids?: string[];
  kb_version?: string;
  language: string;
  audience?: string;
};
```

- `allowed_domains` är slugs som `hr-onboarding`, inte produktmarketingnamn i motorn.  
- Appen får inte skicka “alla ISO-krav” som default. Tom lista = ingen kunskap.  
- `kb_version` pin:ar release. Workspace gissar inte latest.

Relevans i V2: filtrera på domain + module/step + field_ids, därefter text. V1 behöver inte ranking.

---

## Vad adaptern får och inte får

Får:

- returnera redan granskade KnowledgeHit
- ange source_ids
- respektera status `outdated` / `unverified` genom att märka hit

Får inte:

- parafrasera licensierad standard till ny “sanning”
- slå upp webben
- blanda kundmaterial in i generell KB
- presentera `unverified` som lagkrav
- skriva till KB från Workspace

Det följer KB README och CONTENT_DELIVERY källregler.

---

## Koppling till content map

Per produkt ska `SMART_WORKSPACE_CONTENT_MAP.md` (CONTENT_DELIVERY §3.H) lista:

- field_id → knowledge_id
- step_id → knowledge_id
- vad som är original / bearbetat / tolkning

Utan karta får adaptern i V2 bara domain-filter, inte fältprecision. Det är en dokumenterad lucka, inte ett hinder för V1-demo.

---

## Retrieval är V2

KNOWLEDGE_STANDARD §10: Version 1 ska inte kräva vektordatabas eller avancerad agent.

Därför:

- V1 adapter = no-op eller statisk lista  
- V2 = läs `processed/` / tagged Git-release  
- Inte Grok-projektet som runtime
