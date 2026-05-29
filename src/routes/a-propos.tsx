import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Users, Award, Heart } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/utils";
import advisor from "@/assets/about-advisor.jpg";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: `À propos — ${SITE.name} | Courtier mutuelle senior` },
      { name: "description", content: `Découvrez ${SITE.name}, courtier indépendant spécialisé en assurance santé senior depuis ${SITE.founded}. Plus de 10 000 clients accompagnés.` },
      { property: "og:title", content: `À propos de ${SITE.name}` },
      { property: "og:description", content: `Courtier indépendant en assurance santé senior depuis ${SITE.founded}.` },
      { property: "og:url", content: "/a-propos" },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: ShieldCheck, t: "Indépendance", d: "Nous travaillons avec +25 compagnies pour trouver LA meilleure offre, sans parti pris." },
  { icon: Heart, t: "Bienveillance", d: "Un conseiller dédié par dossier, joignable et patient — pour expliquer chaque garantie." },
  { icon: Award, t: "Expertise", d: "Plus de 12 ans d'expérience exclusive sur l'assurance santé des seniors." },
  { icon: Users, t: "Proximité", d: "10 000+ familles accompagnées et 4,9/5 d'avis vérifiés." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={`Le courtier expert des seniors depuis ${SITE.founded}`}
        subtitle={`${SITE.name} accompagne chaque jour des milliers de seniors et leurs familles pour choisir la meilleure couverture santé, au juste prix.`}
        crumbs={[{ label: "À propos" }]}
      />
      <section className="container mx-auto px-4 lg:px-8 max-w-6xl pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src={advisor} alt="Conseiller Pro-Tection avec un client senior" className="rounded-3xl shadow-elegant" loading="lazy" />
          <div>
            <h2 className="text-3xl font-bold mb-4">Notre mission</h2>
            <p className="text-foreground/70 mb-4 leading-relaxed">
              Trouver une mutuelle santé adaptée après 60 ans est devenu un parcours du combattant : dizaines de devis, garanties opaques, tarifs qui flambent chaque année. {SITE.name} a été créé en {SITE.founded} pour remettre du bon sens dans ce marché.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Notre engagement : <strong>écouter, comparer, simplifier</strong>. Nous étudions votre profil de santé, vos besoins et votre budget, puis nous négocions auprès de nos +25 partenaires assureurs la formule qui vous correspond vraiment.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {values.map((v) => (
            <div key={v.t} className="rounded-2xl border bg-card p-6 shadow-card">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground mb-4">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">{v.t}</h3>
              <p className="text-sm text-foreground/70">{v.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ["10 000+", "Clients accompagnés"],
            ["25+", "Compagnies partenaires"],
            ["4,9/5", "Avis clients vérifiés"],
            ["12 ans", "D'expertise senior"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl bg-gradient-hero border p-6">
              <div className="text-3xl font-bold text-primary">{n}</div>
              <div className="text-sm text-foreground/70 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
