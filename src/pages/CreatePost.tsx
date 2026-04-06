import { useState, useRef } from "react";
import { Sparkles, Download, Copy, Hash, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 COLOQUE SUA CHAVE AQUI
const genAI = new GoogleGenerativeAI("AIzaSyDFAZkxNdE8RHOhOeJ3Dyr19xNfNzWSimQ");

export default function CreatePost() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ image: string; caption: string; hashtags: string; title: string } | null>(null);
  
  const cardRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) {
      toast.error("Digite uma ideia para o post!");
      return;
    }

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Atue como um especialista em Instagram. Para a ideia: "${idea}", crie:
      1. Um título curto e impactante (máximo 5 palavras).
      2. Uma legenda cativante com emojis.
      3. 10 hashtags relevantes.
      4. Um termo de busca em inglês para uma foto relacionada.
      Retorne APENAS um JSON: {"title": "...", "caption": "...", "hashtags": "...", "search": "..."}`;

      const chatResponse = await model.generateContent(prompt);
      const text = chatResponse.response.text().replace(/```json|```/g, "").trim();
      const data = JSON.parse(text);

      // Busca imagem dinâmica baseada no que a IA sugeriu
      const imageUrl = `https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1080&auto=format&fit=crop`; // Fallback
      const dynamicImage = `https://source.unsplash.com/featured/1080x1080?${data.search}`;

      setResult({ 
        image: dynamicImage, 
        caption: data.caption, 
        hashtags: data.hashtags,
        title: data.title 
      });

    } catch (error) {
      console.error(error);
      toast.error("Erro ao conectar com a IA. Verifique sua chave.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `post-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Imagem baixada!");
    } catch (err) {
      toast.error("Erro no download.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Caption Magic AI 🧠</h1>
        <p className="text-muted-foreground">Sua ideia vira post em segundos.</p>
      </div>

      <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
        <Textarea
          placeholder="Ex: Homem andando a cavalo no pôr do sol..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="min-h-[100px] text-lg"
        />
        <Button onClick={handleGenerate} disabled={loading} className="w-full h-12 text-lg">
          {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
          Gerar Post Inteligente
        </Button>
      </div>

      {result && (
        <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-4">
            <div ref={cardRef} className="relative aspect-square rounded-xl overflow-hidden shadow-2xl bg-black">
              <img src={result.image} className="w-full h-full object-cover opacity-70" crossOrigin="anonymous" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-center bg-gradient-to-t from-black via-transparent">
                <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-2">
                  {result.title}
                </h3>
                <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase">Caption Magic</p>
              </div>
            </div>
            <Button variant="secondary" className="w-full" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Baixar para o Instagram
            </Button>
          </div>

          <div className="bg-card p-6 rounded-xl border space-y-6">
            <div>
              <h4 className="text-sm font-bold uppercase text-muted-foreground mb-2">Legenda Gerada</h4>
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">{result.caption}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase text-muted-foreground mb-2">Hashtags</h4>
              <p className="text-blue-500 text-sm">{result.hashtags}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}