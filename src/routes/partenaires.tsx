import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/utils";

const PARTNERS = [
  "AXA", "Allianz", "Generali", "Swiss Life", "April", "MAAF", "Macif", "MMA",
  "Groupama", "MAIF", "Aviva", "Cardif", "Malakoff Humanis", "AG2R", "Mercer",
  "Henner", "SantéVie", "Apivia", "Harmonie Mutuelle", "Mutualia", "Néoliane",
  "AcommeAssure", "AESIO", "Cegema", "FMA",
];

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: `Nos partenaires — ${SITE.name} | +25 compagnies d'assurance` },
      { name: "description", content: "Pro-Tection compare +25 compagnies d'assurance leaders pour trouver la meilleure offre adaptée à votre profil senior." },
      { property: "og:title", content: "Partenaires Pro-Tection" },
      { property: "og:description", content: "+25 assureurs partenaires comparés en temps réel." },
      { property: "og:url", content: "/partenaires" },
    ],
    links: [{ rel: "canonical", href: "/partenaires" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Partenaires" title="+25 compagnies d'assurance partenaires" subtitle="Nous comparons en temps réel les meilleurs assureurs pour vous proposer une offre 100% adaptée à votre profil." crumbs={[{ label: "Partenaires" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-6xl pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {PARTNERS.map((p) => (
            <div key={p} className="rounded-2xl border bg-card p-6 shadow-card grid place-items-center text-center font-semibold text-primary hover:shadow-elegant transition">
              {p}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-foreground/60 mt-8">
          {SITE.name} est immatriculé à l'ORIAS en tant que courtier d'assurance indépendant.
        </p>
      </section>
    </>
  );
}
