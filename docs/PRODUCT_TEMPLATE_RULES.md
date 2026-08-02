# Product Template Rules

## Syfte

Detta dokument beskriver återanvändbara produktprinciper för framtida appar som byggs på denna template. Principerna är generella och ska inte kopplas till något specifikt varumärke eller produkt.

Målet är att framtida appar ska digitalisera yrkeskunskap, beslutsstöd och arbetsflöden på ett konsekvent sätt.

## Grundbeslut

### A/B-beslut

A = digitalt dokument/formulär  
B = guidad arbetsupplevelse

Rekommendation: B.

Appar som byggs på denna template ska i första hand byggas som guidade arbetsupplevelser. Dokument, formulär och tabeller kan fortfarande finnas, men de ska stödja arbetet i stället för att vara själva huvudupplevelsen.

## Från Quiz Engine till Guided Workflow Engine

Det övergripande begreppet är `Guided Workflow Engine`.

En quiz-liknande upplevelse kan vara ett bra UI-mönster när användaren ska svara på en fråga i taget, men quiz är inte hela arkitekturen. En `Guided Workflow Engine` omfattar mer:

- arbetssteg
- frågor
- beslut
- hjälptexter
- branschbegrepp
- villkorad logik
- progressive disclosure
- dokumentgenerering i bakgrunden
- anpassning före start
- återanvändbara mönster mellan olika appar

Använd därför inte `Quiz Engine` som plattformsbegrepp. Skriv hellre `Guided Workflow Engine`, `guided workflow`, `arbetssteg`, `beslutsstöd` eller `frågebank` beroende på sammanhang.

## De 15 produktprinciperna

### 1. Digitalisera kunskap, inte dokument

Utgångspunkten är inte att återskapa ett pappersdokument på skärm. Utgångspunkten är att förstå vilken kunskap dokumentet representerar och göra den kunskapen användbar i arbetet.

En framtida app ska därför fråga: vilken bedömning, vilket beslut eller vilken åtgärd hjälper vi användaren med?

### 2. Originaldokument är kunskapskälla, inte UI-specifikation

Originaldokument, mallar, checklistor och branschunderlag är viktiga källor. De ska däremot inte styra UI:t rad för rad.

Dokumentet hjälper teamet att förstå innehåll, krav och begrepp. Produktupplevelsen ska sedan utformas för digital användning.

### 3. Guided Workflow före formulär

Formulär fungerar när användaren redan vet exakt vad som ska fyllas i. Appar ska ofta hjälpa användaren att komma fram till rätt svar.

En guidad arbetsupplevelse delar upp arbetet i tydliga steg, förklarar vad som behövs och minskar känslan av administrativ börda.

### 4. Dokument skapas i bakgrunden

Användaren ska inte behöva "bygga dokumentet" manuellt. Appen ska samla in beslut, svar och val i arbetsflödet och kunna skapa dokumentation i bakgrunden.

Det färdiga dokumentet är ett resultat av arbetet, inte nödvändigtvis arbetsytan.

### 5. Minsta möjliga skrivande

Användaren ska skriva fritext endast när det ger verkligt värde.

Föredra:

- val
- korta beslut
- återanvändbara alternativ
- förklarande hjälptexter
- smarta standardvärden
- möjlighet att komplettera med fritext vid behov

### 6. Intelligent frågebank / arbetsstegsbank

Frågor och arbetssteg ska kunna återanvändas, kombineras och anpassas mellan appar.

Detta betyder inte att alla appar ska ha samma frågor. Det betyder att plattformen ska tänka i återanvändbara byggblock: fråga, beslut, förklaring, villkor, kategori, rekommendation och dokumenteffekt.

### 7. Progressive Disclosure

Visa inte allt samtidigt. Visa det användaren behöver just nu och låt mer avancerad information visas när den behövs.

Detta minskar kognitiv belastning och gör apparna mer användbara för både nya och erfarna användare.

### 8. Positive Productivity

Produktupplevelsen ska kännas som hjälp, inte kontroll.

Appar ska ge användaren känslan av framsteg, tydlighet och trygghet. Tonen ska vara stödjande, inte skuldbeläggande eller byråkratisk.

### 9. Mobil först

Många situationer sker nära arbetet: på byggarbetsplatsen, i produktionen, i fordonet, i ett möte eller under en rondering.

Designa därför för mobil användning först. Desktop kan erbjuda mer översikt, men mobilflödet ska vara fullt användbart.

### 10. Vardagssvenska och branschspråk

Språket ska vara enkelt, konkret och professionellt.

Använd vardagssvenska där det hjälper förståelsen och branschspråk där det ger precision. Undvik onödig myndighets- eller systemterminologi i användarupplevelsen.

### 11. Produktupplevelse är lika viktig som funktion

Det räcker inte att appen kan utföra rätt funktion. Den måste kännas begriplig, trygg och effektiv.

Framtida appar ska därför värdera UX, ordval, stegindelning, tomma tillstånd, återkoppling och visuell rytm som centrala delar av produkten.

### 12. Återanvändbar Guided Workflow Engine

Guidade arbetsflöden ska inte byggas som engångslösningar per app.

Template-projektet ska förbereda för en återanvändbar arkitektur där framtida appar kan definiera arbetssteg, frågor, beslut och dokumenteffekter på ett konsekvent sätt.

Detta dokument beskriver principen. Det implementerar inte motorn.

### 13. Anpassning före start

Användaren ska kunna anpassa arbetsflödet innan det börjar när det är relevant.

Exempel:

- typ av projekt
- verksamhet
- roll
- omfattning
- risknivå
- tillämpliga delar

Det gör att arbetsflödet kan kännas kortare, mer relevant och mer träffsäkert.

### 14. En fråga/ett beslut i taget när det passar

Ett stegvis flöde kan vara mer användbart än ett stort formulär, särskilt på mobil eller när användaren behöver vägledning.

Principen betyder inte att alla vyer alltid ska vara en fråga i taget. Det betyder att produkten ska välja det mönster som bäst stödjer beslutet användaren står inför.

### 15. Översikt/tabell endast där det ger tydligt värde

Tabeller och översikter är värdefulla när användaren behöver jämföra, prioritera, följa upp eller snabbt hitta information.

De ska inte vara standardlösningen för varje arbetsflöde. Om användaren behöver vägledning, börja med guided workflow. Om användaren behöver kontroll och överblick, använd tabell eller dashboard.

## Tillämpning i framtida appar

### Egenkontroll

Egenkontroll kan använda principerna genom att guida användaren genom kontroller, avvikelser och åtgärder steg för steg. Appen ska inte kopieras in i andra produkter, men lärdomen är att kontrollarbete ofta blir bättre när dokumentationen skapas som resultat av en enkel arbetsupplevelse.

### Riskbedömning

Riskbedömning kan använda en Guided Workflow Engine för att hjälpa användaren identifiera risk, konsekvens, sannolikhet och åtgärd. Den ska inte bli en kopia av Egenkontroll, eftersom riskbedömning handlar mer om analys, prioritering och beslut än om återkommande kontrollpunkter.

### Skyddsrond

Skyddsrond kan använda mobil först, minimal skrivning och en fråga i taget när användaren går genom en fysisk miljö. Den ska inte kopiera Egenkontrollens struktur, utan utgå från observationer, plats, åtgärdsbehov och ansvar.

### Kontrollplan

Kontrollplan kan använda originaldokument som kunskapskälla och skapa dokumentation i bakgrunden. Den ska inte bli en checklista från Egenkontroll, utan fokusera på planering, ansvar, kontrollpunkter och spårbarhet.

### Arbetsmiljöplan

Arbetsmiljöplan kan använda anpassning före start för att avgöra vilka delar som är relevanta för projektet. Den ska inte kopiera Egenkontroll, eftersom den ofta kräver mer kontext, roller och planeringsbeslut innan frågor visas.

### Miljöplan

Miljöplan kan använda progressive disclosure för att visa miljöaspekter, krav och åtgärder i rätt ordning. Den ska inte kopiera Egenkontrollens kontrollflöde, utan fokusera på planerade miljöåtgärder, ansvar och uppföljning.

### Revision

Revision kan använda guided workflow för intervjuer, observationer, avvikelser och slutsatser. Den ska inte kopiera Egenkontroll, eftersom revision ofta behöver stödja bevisvärdering, sammanfattningar och rapportering över flera områden.

## Design- och arkitekturkonsekvenser

Framtida appar bör:

- börja med användarens arbetsuppgift, inte dokumentets layout
- modellera arbetssteg och beslut före UI-komponenter
- återanvända språk, mönster och struktur mellan appar utan att göra apparna identiska
- skilja mellan input-upplevelse och genererat dokument
- använda tabeller, dashboards och formulär när de ger tydligt värde
- behandla mobil användning som primär användningsmiljö

## Icke-mål

Detta dokument skapar inte:

- en appimplementation
- en databasmodell
- ett API
- en specifik Egenkontroll-arkitektur
- färdiga workflow-komponenter

Det är ett styrdokument för produktbeslut i framtida appar som byggs på denna template.
