# Smart Workspace Foundation Specification

**Dokumenttyp:** Plattformsspecifikation för app-template  
**Version:** 1.0  
**Status:** FÖRESLAGET  
**Datum:** 2026-09-28  
**Gäller:** `PaddeFTW/app-template` som generiskt lager  
**Bygger på:** SMART_WORKSPACE_KNOWLEDGE_STANDARD.md, SMART_WORKSPACE_SOURCE_BRIEF.md, APP_CONTENT_DELIVERY_STANDARD.md, APP_TEMPLATE_V2_SOURCE_BRIEF.md, APP_BLUEPRINT_V2_SOURCE_BRIEF.md, PRODUCT_APP_HANDOFF_TEMPLATE.md, TERMINOLOGY_STANDARD.md

---

## 1. Vad Smart Workspace är

Smart Workspace är ett **valfritt, generiskt arbetslager** i app-template.

Det ligger ovanpå den öppna produktsidan. Det förstår *var* användaren är och *vilka fält* som finns där. Användaren kan lämna information i fritt språk. Lagret föreslår ändringar. Användaren godkänner eller avvisar. Först därefter får appen skriva.

Det är en gemensam funktion, inte en kommersiell produkt. Det följer TERMINOLOGY_STANDARD: intern term `Smart arbetsyta` / `Smart Workspace`; kundtext ska använda produktens eget språk, inte `engine`, `agent` eller `workflow instance`.

Tre visningslägen finns redan beslutade i SMART_WORKSPACE_SOURCE_BRIEF:

1. inbyggd i en produkt (flytande knapp + panel) — **V1**
2. fokuserad bred arbetsvy — senare
3. central arbetsyta över flera produkter — senare

Quality Light 2.0-briefen tillåter att arbetsytan använder bredare layout än vanliga sidor.

---

## 2. Vad Smart Workspace inte är

- Inte en allmän chatbot.
- Inte en ISO-modul och inte en frågebank.
- Inte Knowledge Base. KB levererar innehåll; Workspace konsumerar via adapter.
- Inte produktlogik för Quality Works Light, Miljöutredning, Kundtillfredsställelse, Egenkontroll.
- Inte betalning, Stripe, Swish, abonnemang eller priser.
- Inte en plats att uppfinna fackkunskap.
- Inte tyst skrivning i appens data i V1.

Handoff-mallen kräver att varje App Blueprint bedömer: Ja / Nej / Delvis. Funktionen tvingas inte in i varje produkt.

---

## 3. Redan beslutat vs nytt i denna spec

### Beslutat i befintliga dokument (återanvänd)

| Beslut | Källa |
|---|---|
| Gemensam funktion, inte separat produkt | SOURCE_BRIEF, KB README |
| Varje blueprint ska bedöma behovet | KNOWLEDGE_STANDARD §1, HANDOFF §9 |
| Fyra innehållsnivåer: original, bearbetad kunskap, professionell tolkning, AI-förslag | KNOWLEDGE_STANDARD §7 |
| AI-förslag ska märkas tydligt | KNOWLEDGE_STANDARD §7, §11 |
| Enkel och professionell förklaring får inte blandas | TERMINOLOGY_STANDARD §6 |
| source_id, knowledge_id, status, version | KNOWLEDGE_STANDARD §5, CONTENT_DELIVERY §4 |
| Kundmaterial blir inte generell kunskap automatiskt | KNOWLEDGE_STANDARD §12 |
| Manuell produktaktivering före betalningsautomation | EXTERNAL_SALES, PRODUCT_ACCESS |
| PlatformShell och ProductShell delar kod | APP_TEMPLATE_V2 |
| V1 i KB-standarden: text, anteckningar, uppgifter, nästa steg, länkar, källor, historik, behörighet, mobil | SOURCE_BRIEF, KNOWLEDGE_STANDARD §10 |

### Nytt i denna spec (kräver godkännande)

Denna spec lägger ett **AI-förslagslager** i app-template V1: fältkontrakt, fri text, proposal, preview, approve/reject/undo, demo utan KB.

### Konflikt som inte får tystas

KB-dokumenten säger uttryckligen att Version 1 **inte ska kräva** avancerad AI-agent, automatisk dokumenttolkning eller vektordatabas.

Denna spec föreslår en **smal** AI i template-V1: en enda modellomgång som mappar fri text till kända fält. Det är inte en agent. Det är inte retrieval.

**Beslut som krävs:** antingen

- A) Template-V1 får smal fältmappning (denna spec), medan KB-V1 förblir anteckningar utan modell, eller  
- B) Template-V1 skjuter all modell till V2 och bygger bara panel + manuella förslag.

Rekommendation: **A**, med förbud mot tyst skrivning, retrieval och actions.

---

## 4. Generiska funktioner i app-template

| Funktion | V1 | V2+ |
|---|---|---|
| Flytande knapp | ja | ja |
| Panel över aktuell sida | ja | ja |
| WorkspaceContext från appen | ja | ja |
| FieldContract från appen | ja | ja |
| Fri text från användaren | ja | ja |
| Lokal/demo-mappning eller en modellomgång | ja | ja |
| Proposal med flera fält | ja | ja |
| Preview old → new | ja | ja |
| Approve / reject / undo | ja | ja |
| Source-nivå (user_input, existing_data, ai_interpretation, knowledge) | ja, enkel | ja, med citation |
| KnowledgeAdapter-gränssnitt | ja, no-op + demo | ja, retrieval |
| ActionContract-gränssnitt | definierat, ej exekverat | ja, vita listan |
| Credits-hook | definierat, no-op | app-ägd implementation |
| Anteckningar / uppgifter / historik | nej i template-V1 | enligt KB-V1 om produkten vill |
| Betalning | nej | nej i template |

---

## 5. Arkitektur

```text
App (kontrakt)
    → SmartWorkspace UI
        → WorkspaceContext
        → FieldContract[]
        → ActionContract[]     (ignorerad i V1 execute)
        → KnowledgeAdapter     (no-op i V1)
        → Mapper / Model
        → Proposal
            → Source / Evidence
            → User Approval
            → Execute (endast field updates i V1)
            → Audit / Usage hook
```

Lagerregler, samma anda som app-template ARCHITECTURE.md:

1. `components/ui` vet inte vad Workspace är.
2. `components/common` får innehålla knapp och panel.
3. `lib/workspace` innehåller kontrakt, mapper, proposal, adapter-typer.
4. Produkten implementerar kontraktet. Template äger inte produktfält.

### 5.1 SmartWorkspace (UI)

- **Syfte:** visa knapp och panel, ta text, visa proposal, ta approve/reject.
- **Får:** läsa context och contracts, anropa mapper, visa källnivå.
- **Får inte:** känna till ISO, skriva data själv, kalla Stripe.

### 5.2 WorkspaceContext

- **Syfte:** tala om var användaren är och vilka värden som redan finns.
- Se `SMART_WORKSPACE_APP_CONTRACT.md`.

### 5.3 FieldContract

- **Syfte:** beskriva fält som får föreslås.
- Se `SMART_WORKSPACE_FIELD_CONTRACT.md`.

### 5.4 ActionContract

- **Syfte:** beskriva säkra åtgärder utöver fält.
- V1: schema finns, execute är avstängd.

### 5.5 KnowledgeAdapter

- **Syfte:** hämta tillåten kunskap för aktuell context.
- V1: `NoopAdapter` eller `DemoAdapter`.
- Se `SMART_WORKSPACE_KNOWLEDGE_ADAPTER.md`.

### 5.6 Mapper / Model

- **Syfte:** text + context + fields → Proposal.
- V1 får en deterministisk demo-mapper plus valfri modellomgång bakom samma gränssnitt.
- **Får inte:** hitta på fält-id, skriva till lagring, hämta webben.

### 5.7 Proposal

- Se `SMART_WORKSPACE_PROPOSAL_SPEC.md`.

### 5.8 Source / Evidence

Fyra nivåer, speglar KB-standarden:

| level | betydelse |
|---|---|
| `user_input` | användaren sa det i panelen eller appen |
| `existing_data` | redan lagrat i posten |
| `knowledge` | Knowledge Base med source_id / knowledge_id |
| `ai_interpretation` | modellens slutsats, aldrig “verifierad källa” |

### 5.9 User Approval

Per proposal eller per change. Inget execute utan uttryckligt godkännande i V1.

### 5.10 Execute

V1: `applyFieldUpdates(recordId, changes[])`. Inga delete, create, navigate.

### 5.11 Audit / Usage

Hook: `{ app_id, proposal_id, action, field_count, adapter, timestamp }`.  
Credits läser hooken. Template lagrar inte pengar.

---

## 6. Kontext som appen måste lämna

Obligatoriskt i V1:

- `app_id`, `app_name`
- `locale`
- `record_id` (eller `null` om ingen post)
- `fields[]` (FieldContract + current value)
- `workspace_enabled`

Rekommenderat:

- `module_id`, `page_id`, `step_id`
- `section_id`
- `user_role` (generisk sträng, inga QW-rollnamn i template)
- `permissions.canApplyWorkspace`

Inte i V1:

- hela företagsobjektet
- hela historiken
- raw Knowledge Base

---

## 7. Appar utan KB, specialiserad app, multi-modul

### Utan KB

Timer, kalkyl, intern demo. Adapter returnerar tomt. Mapper använder bara user_input + existing_data. Fungerar.

### Specialiserad app

En produkt, en modul. Appen skickar ett litet FieldContract och en adapter med `allowed_domains: ["miljo-utredning"]`. Template ändras inte.

### Multi-modul (Quality Works Light-mönster)

Samma knapp. Varje modul registrerar eget kontrakt. Context.module_id byts när användaren byter vy. En adapter får flera domains. Template känner inte till modulnamnen.

---

## 8. Credits utan att byggas in

Template exponerar:

```ts
type UsageEvent = {
  type: "proposal_created" | "proposal_applied" | "proposal_rejected";
  units: number;
};

type UsagePort = {
  canSpend(units: number): boolean | Promise<boolean>;
  record(event: UsageEvent): void | Promise<void>;
};
```

Default: alltid `true`, no-op record. Produkten byter ut porten. Inga priser i template.

---

## 9. Testscenario (generiskt, inte ISO)

Fält: `customer_name`, `contact_person`, `rating`, `comment`, `follow_up_date`.

Användartext:  
“Kunden är ABC Bygg. Anna är kontaktperson. De gav 4 av 5 på leveransen och vill att vi följer upp i oktober.”

Förväntat förslag:

| field | old | new | source.level | reason |
|---|---|---|---|---|
| customer_name | "" | ABC Bygg | user_input | nämnd i texten |
| contact_person | "" | Anna | user_input | nämnd som kontakt |
| rating | null | 4 | user_input | “4 av 5” |
| comment | "" | De gav 4 av 5 på leveransen | ai_interpretation | sammanfattning, märkt som tolkning |
| follow_up_date | null | 2026-10-01 | ai_interpretation | “oktober” utan dag → första dagen, warning |

UI visar preview, warning på datum, Approve / Reject. Approve anropar appens `applyFieldUpdates`. Undo återställer old-värden från proposal.

Full JSON finns i `SMART_WORKSPACE_PROPOSAL_SPEC.md`.

---

## 10. Relaterade filer

- `SMART_WORKSPACE_APP_CONTRACT.md`
- `SMART_WORKSPACE_FIELD_CONTRACT.md`
- `SMART_WORKSPACE_PROPOSAL_SPEC.md`
- `SMART_WORKSPACE_KNOWLEDGE_ADAPTER.md`
- `SMART_WORKSPACE_V1_SCOPE.md`
- `SMART_WORKSPACE_GAPS.md`
