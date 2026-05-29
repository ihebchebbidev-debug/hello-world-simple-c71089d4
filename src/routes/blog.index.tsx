import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Input } from "@/components/ui/input";
import { ARTICLES, CATEGORIES } from "@/lib/blog-data";
import { SITE } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: `Blog Senior — ${SITE.name} | Conseils santé, mutuelle, retraite` },
      { name: "description", content: "100+ articles experts sur la mutuelle senior, la santé après 60 ans, la retraite, la prévention et la prévoyance. Mis à jour quotidiennement." },
      { property: "og:title", content: "Blog Senior Pro-Tection" },
      { property: "og:description", content: "Conseils experts pour bien vivre la retraite et bien se couvrir." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState<string | null>(null);
  const filtered = ARTICLES.filter((a) => {
    if (cat && a.category !== cat) return false;
    if (q && !(a.title.toLowerCase().includes(q.toLowerCase()) || a.excerpt.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <>
      <PageHero eyebrow="Blog" title="Conseils & guides seniors" subtitle="100+ articles experts pour vous accompagner dans tous les aspects de votre santé et de votre couverture." crumbs={[{ label: "Blog" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-6xl pb-24">
        <div className="mb-8 flex flex-col md:flex-row gap-3">
          <Input placeholder="Rechercher un article…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          <button onClick={() => setCat(null)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${!cat ? "bg-primary text-primary-foreground" : "bg-accent hover:bg-accent/70"}`}>Tous</button>
          {CATEGORIES.map((c) => (
            <button key={c.slug} onClick={() => setCat(c.slug)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${cat === c.slug ? "bg-primary text-primary-foreground" : "bg-accent hover:bg-accent/70"}`}>{c.name}</button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 60).map((a) => (
            <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="group rounded-2xl border bg-card overflow-hidden shadow-card hover:shadow-elegant transition-all hover:-translate-y-0.5">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={a.image} alt={a.imageAlt} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold text-primary uppercase tracking-wide">{CATEGORIES.find((c) => c.slug === a.category)?.name}</div>
                <h2 className="mt-2 font-bold text-lg leading-snug line-clamp-2 group-hover:text-primary transition">{a.title}</h2>
                <p className="mt-2 text-sm text-foreground/70 line-clamp-2">{a.excerpt}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-foreground/60">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.readingMinutes} min</span>
                  <span>•</span>
                  <span>{new Date(a.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-foreground/60 py-12">Aucun article trouvé pour votre recherche.</p>}
      </section>
    </>
  );
}
