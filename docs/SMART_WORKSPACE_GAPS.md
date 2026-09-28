# Smart Workspace Gaps

**Version:** 1.0  
**Status:** UNDERLAG SAKNAS / FÖRESLAGET där så anges  
**Datum:** 2026-09-28

Inget av detta är tyst beslut. Inget är ny ISO-kunskap.

---

## Konflikter mellan dokument

### 1. Vad Version 1 innehåller

- **KB SOURCE_BRIEF + KNOWLEDGE_STANDARD §10:** V1 = anteckningar, uppgifter, nästa steg, länkar, källor, historik. Inte avancerad AI-agent, inte dokumenttolkning, inte vektordatabas.  
- **Denna foundation:** V1 = knapp, panel, fältmappning, proposal, approve.

**Lucka:** formellt beslut A eller B (se FOUNDATION_SPEC §3).  
**Rekommendation:** A — smal mapper i template-V1, ingen agent. Uppdatera KB-standarden öppet när beslutet tas, ändra den inte tyst.

### 2. “Quiz” i UI-skisser vs “inte quiz”

Mockuper heter Smart Quiz. PRODUCT_PRINCIPLES och denna spec förbjuder quiz som arkitekturbegrepp.  
**Lucka:** kundnamn på knappen.  
**Rekommendation:** “Smart arbetsyta” internt; produktens eget verb i UI.

### 3. Auto-läge i mockup

Skissen har “Auto”. Ingen styrfil tillåter tyst skrivning.  
**Lucka:** beslut om Auto någonsin.  
**Rekommendation:** nej i V1 och V2 tills audit + permission finns.

---

## Saknat underlag

| Ämne | Status | Konsekvens |
|---|---|---|
| SMART_WORKSPACE_CONTENT_MAP för någon riktig produkt | UNDERLAG SAKNAS | Ingen fältprecision mot KB |
| Kommersiella original registrerade med SHA-256 | UNDERLAG SAKNAS (COMMERCIAL_PRODUCT_ORIGINALS) | Ingen produkt-KB att koppla i V2 |
| De 12 MVP `kb-*.md` enligt agentprompten | Lucka mot GitHub | Adapter C kan inte fyllas |
| Grok-projekt som runtime | Inte tillgängligt här, och ska inte vara runtime | Git-release krävs |
| Modellval, prompt, PII-policy för mappern | EJ BESLUTAT | Default i V1: demo-mapper, modell av |
| Credits-enhet (per proposal vs per apply vs tokens) | EJ BESLUTAT | Bara UsagePort |
| Rollnamn i template vs produkt | Delvis | Template tar generisk `user_role`-sträng |
| RLS / företagsisolering för workspace-loggar | Beslutat som princip, inte schema | V1 loggar inte server-side |
| Mobilgest för panel | KB kräver mobil; ingen wireframe | V1: samma panel, fullbredd under `md` |
| Undo efter navigation bort från sidan | EJ BESLUTAT | V1: undo bara medan proposal finns i minnet |
| Partial apply + senare redigering av samma fält | EJ BESLUTAT | V1: last apply vinner, old_value från den proposal som undos |

---

## Tekniskt som måste utredas före kod i produktion

1. Var körs mappern — client vs server. Client + demo räcker för template-showcase. Produktion med modell kräver server så nycklar inte läcker.  
2. Hur `record_id: null` hanteras (ingen post skapad än). Rekommendation V1: panel öppen, apply disabled tills post finns.  
3. Maxlängd på input_text.  
4. Om showcase i app-template ska leva kvar efter första produktappen.

---

## Medvetet inte ifyllda produktfält

Ingen FieldContract för kundtillfredsställelse, miljöutredning, skyddsrond eller ISO-krav. Det är produktleverans enligt APP_CONTENT_DELIVERY_STANDARD, inte foundation.

När en produkt är redo: handoff §9 + content map + FieldContract i *den* appen.

---

## Beslutslista innan implementation i app-template

1. Godkänn konfliktlösning A (smal mapper i V1).  
2. Godkänn att Auto är av.  
3. Godkänn demo-fälten som enda showcase.  
4. Godkänn att KB-retrieval väntar till V2.  
5. Välj om modellomgången i V1 är av som default (rekommenderat ja).
