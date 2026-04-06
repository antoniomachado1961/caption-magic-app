import { useState } from "react";
import { Sparkles, Download, Copy, Hash, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import placeholderPost from "@/assets/placeholder-post.jpg";

const MOCK_CAPTION = `🎉 PROMOÇÃO DE PÁSCOA! 🐣✨

Que tal deixar essa Páscoa ainda mais especial? 🍫

Preparamos algo incrível pra você:

🔥 20% OFF em todos os produtos da nossa loja!
📦 Frete GRÁTIS para compras acima de R$99
🎁 Brinde exclusivo nos pedidos até sexta-feira

Não perca essa oportunidade de presentear quem você ama (e a si mesmo também, né? 😉)

👉 Acesse o link na bio e garanta o seu!

⏰ Promoção válida até 20/04

`;

const MOCK_HASHTAGS = `#Pascoa2025 #PromoçãoDePáscoa #Desconto #FretGratis #Oferta #Empreendedorismo #PequenosNegócios #LojaOnline #Chocolate #PáscoaFeliz`;

export default function CreatePost() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ image: string; caption: string; hashtags: string } | null>(null);

  const handleGenerate = () => {
    if (!idea.trim()) {
      toast.error("Digite uma ideia para o post!");
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult({ image: placeholderPost, caption: MOCK_CAPTION, hashtags: MOCK_HASHTAGS });
      setLoading(false);
    }, 2500);
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado!`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          O que vamos postar hoje? 🚀
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Descreva sua ideia e a IA cria o post completo pra você.
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-card p-5 md:p-6 space-y-4 border border-border">
        <Textarea
          placeholder="Ex: Post de promoção de Páscoa com 20% de desconto em todos os produtos..."
          className="min-h-[120px] resize-none text-sm bg-background border-input focus:ring-2 focus:ring-ring"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <Button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full md:w-auto gradient-primary text-primary-foreground font-semibold text-sm h-12 px-8 rounded-xl transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Gerando seu post...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Gerar Post Completo ✨
            </>
          )}
        </Button>
      </div>

      {loading && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl shadow-card p-5 border border-border">
            <div className="aspect-square rounded-lg animate-shimmer" />
          </div>
          <div className="bg-card rounded-xl shadow-card p-5 border border-border space-y-3">
            <div className="h-4 w-3/4 rounded animate-shimmer" />
            <div className="h-4 w-full rounded animate-shimmer" />
            <div className="h-4 w-5/6 rounded animate-shimmer" />
            <div className="h-4 w-2/3 rounded animate-shimmer" />
            <div className="h-4 w-full rounded animate-shimmer" />
            <div className="h-4 w-1/2 rounded animate-shimmer" />
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up">
          <div className="bg-card rounded-xl shadow-card p-5 border border-border space-y-4">
            <h2 className="text-sm font-semibold text-foreground">📸 Imagem do Post</h2>
            <img
              src={result.image}
              alt="Post gerado"
              className="w-full aspect-square object-cover rounded-lg"
              loading="lazy"
              width={1024}
              height={1024}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full border-border text-foreground hover:bg-secondary"
              onClick={() => toast.success("Download iniciado!")}
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar Imagem
            </Button>
          </div>

          <div className="bg-card rounded-xl shadow-card p-5 border border-border space-y-4">
            <h2 className="text-sm font-semibold text-foreground">📝 Legenda</h2>
            <div className="bg-secondary/50 rounded-lg p-4 text-sm text-foreground whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto">
              {result.caption}
            </div>
            <div className="bg-muted rounded-lg p-3 text-xs text-muted-foreground">
              {result.hashtags}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-secondary text-xs"
                onClick={() => copyText(result.caption, "Texto")}
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Copiar Texto
              </Button>
              <Button
                type="button"
                className="flex-1 gradient-primary text-primary-foreground text-xs hover:opacity-90"
                onClick={() => copyText(result.caption + "\n\n" + result.hashtags, "Texto e hashtags")}
              >
                <Hash className="mr-1.5 h-3.5 w-3.5" />
                Texto + Hashtags
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
