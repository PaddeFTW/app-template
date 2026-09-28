# Smart Workspace V1 Scope

**Version:** 1.0  
**Status:** FÖRESLAGET  
**Datum:** 2026-09-28  
**Målrepo för implementation senare:** PaddeFTW/app-template

---

## V1 ska byggas

I app-template, som delat lager:

1. Flytande knapp (`SmartWorkspaceButton`)  
2. Panel (`SmartWorkspacePanel`)  
3. Typer för WorkspaceContext, FieldContract, Proposal, SourceRef  
4. App Contract: `getContext` + `applyFieldUpdates`  
5. Textfält i panelen  
6. Mapper-port: demo-mapper som klarar testscenariot utan KB  
7. Valfri modellomgång bakom samma port (avstängd som default)  
8. Preview old → new för flera fält  
9. Approve, reject, approve selected  
10. Undo efter apply  
11. Enkel källmärkning: user_input / existing_data / ai_interpretation  
12. Warnings i UI  
13. `NoopAdapter` + `DemoAdapter`  
14. `UsagePort` no-op  
15. Showcase på template-startsidan med de fem demofälten  

Ingen produktroute. Ingen ISO-copy i UI utöver ev. befintlig generic showcase.

---

## V1 ska inte byggas

- Stripe, Swish, faktura, priser, abonnemang  
- Credits-ledger (bara porten)  
- Knowledge retrieval mot GitHub eller Grok  
- Citations mot source_id i produktion  
- Action execute (create/delete/navigate/summary)  
- Auto-apply / “Auto”-läge från mockupen  
- Bakgrundsagent, multi-agent, tool-calling mot appen  
- Dokumentuppladdning och PDF-tolkning  
- Anteckningar, uppgiftslista, historikvy (finns i KB-V1 som *produktinnehåll*, inte krav på template-V1)  
- Fokuserad fullbreddsvy och central arbetsyta  
- Realtime collaboration  
- Storybook / CI utöver befintlig lint  
- Quality Works Light-moduler och priser  

---

## V2

- KnowledgeAdapter mot tagged KB-release  
- Citations: knowledge_id + source_id + status  
- Bättre mapping och conflict UI  
- ActionContract execute för vitlistade actions  
- Content map per produkt  
- Sammanfattning som action, inte tyst fält  
- UsagePort kopplad till produktens credits  
- Användarpreferens: enkel vs professionell hjälptext (TERMINOLOGY_STANDARD §6)  
- Navigation “gå till saknat fält”  

## Senare

- Dokumentanalys  
- Guided Workflow Engine som separat motor (PRODUCT_PRINCIPLES) — inte samma sak som Workspace  
- Central workspace över appar  
- Betalvägar i respektive produktapp  

---

## Definition of done för template-V1

- Knapp syns bara när `workspace_enabled`  
- Testscenariot ger fem föreslagna fält varav datum har warning  
- Reject lämnar posten orörd  
- Approve anropar bara appens callback  
- Undo fungerar  
- Inga ISO-strängar i `lib/workspace`  
- DemoAdapter kan slås av utan UI-brott  

---

## Föreslagen filplacering när kod väl skrivs

```text
components/common/smart-workspace-button.tsx
components/common/smart-workspace-panel.tsx
lib/workspace/context.ts
lib/workspace/field-contract.ts
lib/workspace/proposal.ts
lib/workspace/adapter.ts
lib/workspace/usage.ts
lib/workspace/demo-mapper.ts
```

Inte nu. Denna fil är scope, inte implementation.
