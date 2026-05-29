import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/utils";

const REVIEWS = [
  { n: "Françoise M.", c: "Marseille", t: "Conseil exceptionnel. J'ai économisé 480€/an sur ma mutuelle et les garanties sont meilleures !", r: 5 },
  { n: "Jean-Pierre D.", c: "Lyon", t: "Très professionnel. Le conseiller a pris le temps d'expliquer chaque garantie. Recommandé.", r: 5 },
  { n: "Christine R.", c: "Paris", t: "J'ai changé d'assurance emprunteur grâce à la loi Lemoine, économie de 8 200€ sur le crédit !", r: 5 },
  { n: "Michel B.", c: "Toulouse", t: "Souscription rapide, prise en charge immédiate de mon hospitalisation. Bravo !", r: 5 },
  { n: "Annie L.", c: "Nantes", t: "Service client humain et disponible. On sent qu'ils connaissent les seniors.", r: 5 },
  { n: "Robert F.", c: "Strasbourg", t: "Excellent rapport qualité/prix. Mon conseiller est toujours joignable.", r: 5 },
];

export const Route = createFileRoute("/temoignages")({
  head: () => ({
    meta: [
      { title: `Avis clients — ${SITE.name} | 4,9/5 sur +2 000 avis vérifiés` },
      { name: "description", content: "Découvrez les témoignages de nos clients seniors satisfaits. Note moyenne 4,9/5 sur +2 000 avis vérifiés." },
      { property: "og:title", content: "Avis clients Pro-Tection" },
      { property: "og:description", content: "+2 000 avis vérifiés, 4,9/5 de satisfaction." },
      { property: "og:url", content: "/temoignages" },
    ],
    links: [{ rel: "canonical", href: "/temoignages" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Témoignages" title="Ils nous font confiance" subtitle={`+10 000 seniors accompagnés depuis ${SITE.founded}, 4,9/5 sur +2 000 avis vérifiés.`} crumbs={[{ label: "Témoignages" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-6xl pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <article key={r.n} className="rounded-2xl border bg-card p-6 shadow-card">
              <div className="flex gap-0.5 text-amber-500 mb-3">{Array.from({ length: r.r }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="text-sm text-foreground/80 leading-relaxed italic">"{r.t}"</p>
              <div className="mt-4 text-sm font-semibold">{r.n} <span className="text-foreground/60 font-normal">— {r.c}</span></div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
