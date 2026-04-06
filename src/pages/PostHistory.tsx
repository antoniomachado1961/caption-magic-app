import { History, ExternalLink } from "lucide-react";
import placeholderPost from "@/assets/placeholder-post.jpg";

const mockHistory = [
  { id: 1, title: "Promoção de Páscoa", date: "02/04/2026", image: placeholderPost },
  { id: 2, title: "Lançamento de produto", date: "01/04/2026", image: placeholderPost },
  { id: 3, title: "Dica da semana", date: "30/03/2026", image: placeholderPost },
];

export default function PostHistory() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Histórico</h1>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          Veja todos os posts que você já gerou.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockHistory.map((post) => (
          <div
            key={post.id}
            className="group bg-card rounded-xl shadow-card border border-border overflow-hidden transition-all hover:shadow-elevated hover:-translate-y-0.5"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-square object-cover"
              loading="lazy"
              width={1024}
              height={1024}
            />
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{post.title}</p>
                <p className="text-xs text-muted-foreground">{post.date}</p>
              </div>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
