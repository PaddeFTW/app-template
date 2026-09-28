# Smart Workspace Proposal Spec

**Version:** 1.0  
**Status:** FÖRESLAGET  
**Datum:** 2026-09-28

---

## Princip

AI skriver inte i appens data. AI skapar ett **Proposal**. Användaren godkänner. Appen exekverar.

Det följer KB-standarden: AI-förslag är en egen innehållsnivå och ska märkas.

---

## Proposal

```ts
type Proposal = {
  proposal_id: string;
  created_at: string;
  app_id: string;
  record_id: string | null;
  input_text: string;
  status: "draft" | "approved" | "rejected" | "applied" | "undone";
  changes: ProposalChange[];
  warnings: ProposalWarning[];
  sources: SourceRef[];
};
```

Flera fält i samma proposal är standard, inte specialfall.

---

## ProposalChange

```ts
type ProposalChange = {
  field_id: string;
  label: string;
  old_value: unknown;
  new_value: unknown;
  confidence: 0 | 1 | 2 | 3; // 0 osäker … 3 given i texten
  reason: string;
  source_ref: string;
  blocked?: boolean;
  warning_ids?: string[];
};
```

- `old_value` krävs så undo fungerar och så användaren ser diff.  
- `reason` är en kort mening på panelens språk. Inte klausulnummer.  
- `source_ref` pekar på `sources[].id`.  
- `blocked: true` = visad men inte applicerbar (fel typ, otillåtet värde).

---

## Warning

```ts
type ProposalWarning = {
  id: string;
  field_id?: string;
  code:
    | "ambiguous_date"
    | "missing_required"
    | "value_not_in_allowed"
    | "low_confidence"
    | "conflict_with_existing"
    | "unmapped_input";
  message: string;
};
```

`conflict_with_existing`: föreslaget värde skiljer sig från ifyllt värde. V1 skriver inte över utan approve. UI ska visa båda.

`unmapped_input`: delar av texten gick inte till något fält. Behålls som information, inte som tyst dataförlust.

---

## Source / Evidence

```ts
type SourceRef = {
  id: string;
  level: "user_input" | "existing_data" | "knowledge" | "ai_interpretation";
  label: string;
  excerpt?: string;
  knowledge_id?: string;
  source_id?: string;
  version?: string;
  status?: "BEKRÄFTAT" | "BESLUTAT" | "FÖRESLAGET" | "EJ GRANSKAT" | "UNDERLAG SAKNAS" | "KONFLIKT" | "unverified" | "current" | "outdated";
};
```

Regler:

1. `user_input` när användaren sagt värdet.  
2. `existing_data` när värdet redan fanns och bara upprepas.  
3. `knowledge` endast när adapter returnerat objekt med id.  
4. `ai_interpretation` när modellen gissat (månad → datum, parafras).  
5. `ai_interpretation` får inte visas som “enligt källa” eller “enligt krav”.

V1 utan KB: bara `user_input`, `existing_data`, `ai_interpretation`.

---

## Godkännande

| Handling | Effekt |
|---|---|
| Approve all | status → approved → applyFieldUpdates för icke-blockerade changes |
| Reject all | status → rejected, ingen skrivning |
| Approve selected | endast ikryssade changes |
| Undo | efter applied: skriv tillbaka old_value för applicerade fält |

V1 har ingen “Auto”-körning. Toggle i mockupen är inte tillåten förrän ett uttryckligt produktbeslut finns (se GAPS).

Om `permissions.canApplyWorkspace` är false: panelen är skrivskyddad preview.

---

## Testscenario JSON

Input:

```text
Kunden är ABC Bygg. Anna är kontaktperson. De gav 4 av 5 på leveransen och vill att vi följer upp i oktober.
```

Proposal (förkortad):

```json
{
  "proposal_id": "prp_demo_001",
  "app_id": "demo-app",
  "record_id": "rec_1",
  "status": "draft",
  "input_text": "Kunden är ABC Bygg. Anna är kontaktperson. De gav 4 av 5 på leveransen och vill att vi följer upp i oktober.",
  "changes": [
    {
      "field_id": "customer_name",
      "label": "Kundnamn",
      "old_value": "",
      "new_value": "ABC Bygg",
      "confidence": 3,
      "reason": "Kunden namngavs i texten.",
      "source_ref": "src_user"
    },
    {
      "field_id": "contact_person",
      "label": "Kontaktperson",
      "old_value": "",
      "new_value": "Anna",
      "confidence": 3,
      "reason": "Kontaktperson namngavs i texten.",
      "source_ref": "src_user"
    },
    {
      "field_id": "rating",
      "label": "Betyg",
      "old_value": null,
      "new_value": 4,
      "confidence": 3,
      "reason": "Användaren angav 4 av 5.",
      "source_ref": "src_user"
    },
    {
      "field_id": "comment",
      "label": "Kommentar",
      "old_value": "",
      "new_value": "De gav 4 av 5 på leveransen.",
      "confidence": 1,
      "reason": "Kort sammanfattning av underlaget.",
      "source_ref": "src_ai",
      "warning_ids": ["w_low"]
    },
    {
      "field_id": "follow_up_date",
      "label": "Uppföljning",
      "old_value": null,
      "new_value": "2026-10-01",
      "confidence": 1,
      "reason": "Endast månad angavs. Första dagen i oktober föreslås.",
      "source_ref": "src_ai",
      "warning_ids": ["w_date"]
    }
  ],
  "warnings": [
    {
      "id": "w_date",
      "field_id": "follow_up_date",
      "code": "ambiguous_date",
      "message": "Ingen dag angavs. Kontrollera datumet innan du godkänner."
    },
    {
      "id": "w_low",
      "field_id": "comment",
      "code": "low_confidence",
      "message": "Kommentaren är en tolkning, inte ett citat."
    }
  ],
  "sources": [
    {
      "id": "src_user",
      "level": "user_input",
      "label": "Din text",
      "excerpt": "Kunden är ABC Bygg. Anna är kontaktperson."
    },
    {
      "id": "src_ai",
      "level": "ai_interpretation",
      "label": "Tolkning"
    }
  ]
}
```

Efter Approve: fem fält uppdaterade (eller fyra om användaren avmarkerar kommentaren). Undo återställer samma fem `old_value`.
