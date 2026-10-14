"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  { id: "questions", title: "Beskriv verksamheten", desc: "Svara på frågor om hur ni arbetar idag." },
  { id: "review", title: "Granska i Smart arbetsyta", desc: "AI-förslag visas. Du godkänner eller ändrar." },
  { id: "publish", title: "Publicera material", desc: "Dokument och underlag blir tillgängliga i modulen." },
];

export function GuidedSmartEntry({ moduleName = "Modul" }: { moduleName?: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState("");

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-primary/10 p-2 text-primary"><Sparkles className="size-5" /></div>
          <div>
            <CardTitle>Smart arbetsyta före {moduleName}</CardTitle>
            <CardDescription>Frågor → granskning → publicering. Materialet byggs från dina svar.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <Badge variant={i <= step ? "default" : "secondary"} className="rounded-full">
                {i < step ? <CheckCircle2 className="size-3" /> : i + 1}
              </Badge>
              <span className={`text-sm ${i === step ? "font-medium" : "text-muted-foreground"}`}>{s.title}</span>
              {i < STEPS.length - 1 && <ArrowRight className="size-4 text-muted-foreground" />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Beskriv hur ni arbetar med det som modulen handlar om. Exempel: processer, ansvar, vad som finns idag.</p>
            <Textarea
              value={answers}
              onChange={(e) => setAnswers(e.target.value)}
              placeholder="Vi har en checklista för egenkontroll. Ansvarig är Anna. Vi dokumenterar i Excel..."
              rows={5}
            />
            <Button onClick={() => setStep(1)} disabled={!answers.trim()}>
              Skapa förslag <ArrowRight className="size-4" />
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="text-sm font-medium mb-2">AI-förslag (demo)</p>
              <p className="text-sm text-muted-foreground">Baserat på dina svar: Egenkontroll genomförs av Anna. Dokumentation sker i Excel. Förslag på mall och rutin genereras.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(0)}>Ändra svar</Button>
              <Button onClick={() => setStep(2)}>Godkänn och publicera</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex items-center gap-3 rounded-lg border border-success/30 bg-success-subtle p-4">
            <FileText className="size-5 text-success" />
            <div>
              <p className="font-medium">Material publicerat</p>
              <p className="text-sm text-muted-foreground">Underlaget finns nu i {moduleName}. Du kan redigera det när som helst.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
