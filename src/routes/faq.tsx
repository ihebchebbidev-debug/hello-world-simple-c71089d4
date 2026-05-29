import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/utils";

const FAQ = [
  { q: "Quel est l'âge minimum pour souscrire une mutuelle senior ?", a: "Nos mutuelles sont accessibles dès 55 ans. Plus vous souscrivez tôt, plus les tarifs sont avantageux." },
  { q: "Y a-t-il un questionnaire médical ?", a: "Non, aucun questionnaire médical n'est requis pour nos mutuelles santé. Pour la prévoyance ou l'assurance emprunteur, certaines formules peuvent en demander." },
  { q: "Puis-je résilier à tout moment ?", a: "Oui, la loi de résiliation infra-annuelle (2020) permet de résilier votre mutuelle à tout moment après la première année, sans frais ni justification." },
  { q: "Combien coûte un devis ?", a: "Nos devis et conseils sont 100% gratuits, sans engagement. Nous sommes rémunérés uniquement par les assureurs partenaires." },
  { q: "Combien de temps pour recevoir un devis ?", a: "Un conseiller vous rappelle sous 24h ouvrées avec une proposition personnalisée." },
  { q: "Êtes-vous un courtier indépendant ?", a: `Oui, ${SITE.name} est un courtier indépendant immatriculé à l'ORIAS. Nous comparons +25 compagnies pour vous trouver la meilleure offre.` },
  { q: "Que se passe-t-il en cas d'hospitalisation ?", a: "Prise en charge directe : aucune avance de frais. Le forfait journalier, la chambre particulière et les dépassements d'honoraires sont couverts selon votre formule." },
  { q: "Les soins dentaires et optiques sont-ils bien couverts ?", a: "Oui, nos formules prévoient des remboursements jusqu'à 400% du tarif de la Sécurité sociale pour les prothèses dentaires, implants, verres progressifs." },
  { q: "Puis-je inclure mon conjoint ?", a: "Oui, le conjoint et même les enfants à charge peuvent être ajoutés. Des tarifs famille sont disponibles." },
  { q: "La loi Lemoine s'applique-t-elle après 60 ans ?", a: "Oui, la loi Lemoine permet de changer d'assurance emprunteur à tout moment, quel que soit votre âge ou la date du prêt." },
  { q: "Quels sont les délais de carence ?", a: "Aucun délai sur les soins courants et l'hospitalisation. Le dentaire peut être soumis à 3 mois selon la formule." },
  { q: "Comment êtes-vous payés ?", a: "Notre rémunération est intégrée au tarif de la mutuelle et versée par l'assureur. Vous ne payez aucun frais de courtage." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: `FAQ — ${SITE.name} | Questions sur la mutuelle senior` },
      { name: "description", content: "Réponses aux questions fréquentes sur la mutuelle senior, l'assurance emprunteur, la prévoyance et la dépendance." },
      { property: "og:title", content: "FAQ Mutuelle Senior" },
      { property: "og:description", content: "Toutes les réponses sur la mutuelle santé après 60 ans." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions fréquentes" subtitle="Toutes les réponses sur la mutuelle senior, l'emprunteur, la prévoyance et la dépendance." crumbs={[{ label: "FAQ" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-3xl pb-24">
        <div className="space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-2xl border bg-card p-5 shadow-card">
              <summary className="cursor-pointer font-semibold flex justify-between items-center">
                {f.q}<span className="ml-2 text-primary group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
