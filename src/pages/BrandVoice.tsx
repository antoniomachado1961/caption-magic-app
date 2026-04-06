import { useState } from "react";
import { Save, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function BrandVoice() {
  const [form, setForm] = useState({
    businessName: "",
    audience: "",
    tone: "",
    rules: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso! ✅");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <Mic className="h-6 w-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Minha Marca (Voz)
          </h1>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure como a IA deve escrever os posts da sua marca.
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-card p-5 md:p-6 border border-border space-y-5">
        <div className="space-y-2">
          <Label htmlFor="businessName" className="text-sm font-medium text-foreground">
            Nome do Negócio
          </Label>
          <Input
            id="businessName"
            placeholder="Ex: Doces da Ana"
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            className="bg-background border-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="audience" className="text-sm font-medium text-foreground">
            Público-alvo
          </Label>
          <Input
            id="audience"
            placeholder="Ex: Mulheres de 25 a 45 anos, mães, que gostam de confeitaria"
            value={form.audience}
            onChange={(e) => update("audience", e.target.value)}
            className="bg-background border-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tone" className="text-sm font-medium text-foreground">
            Tom de Voz
          </Label>
          <Input
            id="tone"
            placeholder="Ex: descontraído, divertido, amigável"
            value={form.tone}
            onChange={(e) => update("tone", e.target.value)}
            className="bg-background border-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rules" className="text-sm font-medium text-foreground">
            Regras Extras
          </Label>
          <Textarea
            id="rules"
            placeholder="Ex: não use palavras difíceis, sempre inclua emojis, mencione o Instagram..."
            value={form.rules}
            onChange={(e) => update("rules", e.target.value)}
            className="min-h-[100px] resize-none bg-background border-input"
          />
        </div>

        <Button
          onClick={handleSave}
          className="w-full md:w-auto gradient-primary text-primary-foreground font-semibold h-11 px-8 rounded-xl hover:opacity-90 active:scale-[0.98]"
        >
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
