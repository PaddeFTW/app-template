# Smart Workspace Field Contract

**Version:** 1.0  
**Status:** FÖRESLAGET  
**Datum:** 2026-09-28

---

## Syfte

Beskriva fält som Smart Workspace får föreslå värden för. Kontraktet är generiskt. Inga produktnamn.

---

## Obligatoriska egenskaper V1

```ts
type FieldContract = {
  id: string;
  label: string;
  type: FieldTypeV1;
  required: boolean;
  ai_writable: boolean;
};
```

| Egenskap | Regel |
|---|---|
| id | Stabil inom appen. Snake eller kebab. Aldrig visad som tekniskt id i kundtext om label finns. |
| label | Kundens språk. |
| type | Se V1-typer nedan. |
| required | Appens regel. Workspace får varna om required saknas efter mappning. |
| ai_writable | `false` = visas i context men får inte föreslås. Signatur, id, status satta av systemet. |

---

## Valfria egenskaper V1

```ts
type FieldContractOptional = {
  description?: string;
  placeholder?: string;
  example?: string;
  allowed_values?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
  multiline?: boolean;
};
```

`description` är hjälp nära fältet, inte en ISO-tolkning.  
`allowed_values` krävs för `select` och `multiselect`.

---

## Medvetet utelämnat i V1

| Egenskap | Varför |
|---|---|
| sourceRequired | Hör till KB-leverans, inte till varje fält i template |
| validation regex | Appen validerar i applyFieldUpdates |
| knowledge_id på fältet | Adapter + content map, inte field schema |
| simple_text / professional_text | KB-objekt, inte field instance |
| industry / role | Adapter-filter |

---

## Typer

### V1 — ska stödjas

| type | Betydelse | new_value |
|---|---|---|
| `text` | kort sträng | string |
| `textarea` | längre text | string |
| `number` | tal | number |
| `date` | kalenderdag ISO `YYYY-MM-DD` | string |
| `select` | ett val ur allowed_values | string |
| `checkbox` | ja/nej | boolean |
| `rating` | heltal inom min–max, default 1–5 | number |

### V2 — schema får finnas, mapper behöver inte

| type | Kommentar |
|---|---|
| `multiselect` | array av string |
| `datetime` | |
| `url` | |
| `email` | |
| `file_ref` | endast referens, ingen uppladdning via Workspace i V1 |

Inga fria “etc”-typer i V1. Okänd typ ignoreras av mappern.

---

## Regler för skrivbarhet

1. `ai_writable: false` → change skapas inte.  
2. Värde som redan är identiskt → change utelämnas.  
3. `select` måste träffa `allowed_values`, annars warning + ingen change eller change med `blocked: true`.  
4. `date` utan dag får warning och proposed first-of-month, inte tyst “fakta”.  
5. Fält som saknas i kontraktet får inte uppfinnas.

---

## Exempel (generiskt)

```json
[
  {
    "id": "customer_name",
    "label": "Kundnamn",
    "type": "text",
    "required": true,
    "ai_writable": true,
    "placeholder": "Företagets namn",
    "example": "ABC Bygg"
  },
  {
    "id": "contact_person",
    "label": "Kontaktperson",
    "type": "text",
    "required": false,
    "ai_writable": true
  },
  {
    "id": "rating",
    "label": "Betyg",
    "type": "rating",
    "required": false,
    "ai_writable": true,
    "min": 1,
    "max": 5
  },
  {
    "id": "comment",
    "label": "Kommentar",
    "type": "textarea",
    "required": false,
    "ai_writable": true
  },
  {
    "id": "follow_up_date",
    "label": "Uppföljning",
    "type": "date",
    "required": false,
    "ai_writable": true
  },
  {
    "id": "record_status",
    "label": "Status",
    "type": "select",
    "required": true,
    "ai_writable": false,
    "allowed_values": [
      { "value": "draft", "label": "Utkast" },
      { "value": "open", "label": "Pågår" }
    ]
  }
]
```
