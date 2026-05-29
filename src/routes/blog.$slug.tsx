import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, User, Share2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/site/QuoteModal";
import { getArticleBySlug, getRelated, getCategoryBySlug } from "@/lib/blog-data";
import { SITE } from "@/lib/utils";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article, related: getRelated(params.slug), category: getCategoryBySlug(article.category) };
  },
  head: ({ params, loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article — Pro-Tection" }] };
    return {
      meta: [
        { title: `${a.title} — ${SITE.name}` },
        { name: "description", content: a.metaDescription },
        { name: "author", content: a.author },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "og:image", content: a.image },
        { property: "article:published_time", content: a.publishedAt },
        { property: "article:modified_time", content: a.updatedAt },
        { property: "article:author", content: a.author },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.metaDescription,
          image: a.image,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt,
          author: { "@type": "Person", name: a.author },
          publisher: { "@type": "Organization", name: SITE.name },
        }),
      }, {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: a.faq.map((f) => ({
            "@type": "Question", name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-[60vh] grid place-items-center px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Article introuvable</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">← Retour au blog</Link>
      </div>
    </div>
  ),
  errorComponent: () => <div className="p-20 text-center">Erreur de chargement.</div>,
  component: ArticlePage,
});

function ArticlePage() {
  const params = Route.useParams();
  const article = getArticleBySlug(params.slug)!;
  const related = getRelated(params.slug);
  const category = getCategoryBySlug(article.category);
  const { open } = useQuote();
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <PageHero
        eyebrow={category?.name}
        title={article.title}
        subtitle={article.excerpt}
        crumbs={[{ label: "Blog", to: "/blog" }, { label: category?.name ?? "Article" }]}
      />
      <article className="container mx-auto px-4 lg:px-8 max-w-3xl pb-24">
        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-6">
          <span className="flex items-center gap-1"><User className="h-4 w-4" /> {article.author}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {article.readingMinutes} min de lecture</span>
          <span>Publié le {new Date(article.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span>· Mis à jour le {new Date(article.updatedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>

        <img src={article.image} alt={article.imageAlt} className="rounded-3xl shadow-elegant w-full mb-8" />

        <p className="text-lg leading-relaxed text-foreground/80 mb-10 font-medium">{article.intro}</p>

        {article.sections.map((s, i) => (
          <section key={i} className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4">{s.h2}</h2>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{s.body}</p>
          </section>
        ))}

        <div className="my-12 rounded-3xl bg-gradient-primary p-8 text-primary-foreground text-center shadow-elegant">
          <h3 className="text-2xl font-bold mb-2">Besoin d'un devis personnalisé ?</h3>
          <p className="text-white/80 mb-5">Un conseiller {SITE.name} vous rappelle gratuitement sous 24h.</p>
          <Button variant="secondary" size="lg" onClick={() => open()}>Recevoir mon devis gratuit</Button>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
          <div className="space-y-3">
            {article.faq.map((f) => (
              <details key={f.q} className="group rounded-2xl border bg-card p-5">
                <summary className="cursor-pointer font-semibold flex justify-between items-center">
                  {f.q}<span className="ml-2 text-primary group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 pt-6 border-t flex items-center gap-3 text-sm">
          <Share2 className="h-4 w-4" /> <span className="font-semibold">Partager :</span>
          <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} className="px-3 py-1 rounded-full hover:bg-accent text-xs font-semibold">Facebook</a>
          <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`} className="px-3 py-1 rounded-full hover:bg-accent text-xs font-semibold">X</a>
          <a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} className="px-3 py-1 rounded-full hover:bg-accent text-xs font-semibold">LinkedIn</a>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Articles liés</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }} className="group rounded-2xl border bg-card overflow-hidden shadow-card hover:shadow-elegant transition">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={r.image} alt={r.imageAlt} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
