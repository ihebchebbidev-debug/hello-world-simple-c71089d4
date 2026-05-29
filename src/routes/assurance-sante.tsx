import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ProductLanding } from "@/components/site/ProductLanding";
import { SITE } from "@/lib/utils";
import img from "@/assets/cat-sante-senior.jpg";

export const Route = createFileRoute("/assurance-sante")({
  head: () => ({
    meta: [
      { title: `Mutuelle Santé Senior — ${SITE.name} | Devis gratuit après 60 ans` },
      { name: "description", content: "Mutuelle senior dès 19€/mois : optique, dentaire, hospitalisation, audition. Comparez +25 assureurs et économisez jusqu'à 40%." },
      { property: "og:title", content: `Mutuelle Santé Senior — ${SITE.name}` },
      { property: "og:description", content: "Comparez les meilleures mutuelles senior et économisez jusqu'à 40%." },
      { property: "og:url", content: "/assurance-sante" },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "/assurance-sante" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Mutuelle Santé Senior",
        description: "Mutuelle santé senior avec garanties renforcées sur l'optique, le dentaire, l'audition et l'hospitalisation.",
        brand: { "@type": "Brand", name: SITE.name },
      }),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Mutuelle Senior" title="Une mutuelle pensée pour les +60 ans" subtitle="Garanties renforcées sur l'optique, le dentaire, l'audition et l'hospitalisation. Sans questionnaire médical." crumbs={[{ label: "Mutuelle Santé" }]} />
      <ProductLanding
        title="Une couverture santé complète, sans mauvaise surprise"
        intro="Avec l'âge, les besoins en soins évoluent. Notre mutuelle senior couvre les postes les plus coûteux — prothèses dentaires, audioprothèses, hospitalisation — avec des remboursements jusqu'à 400% du tarif de la Sécurité sociale."
        image={img}
        quoteType="Mutuelle santé senior"
        benefits={[
          { title: "Sans questionnaire médical", desc: "Aucune sélection ni surprime liée à l'âge ou aux antécédents." },
          { title: "Remboursements jusqu'à 400%", desc: "Dentaire, optique, audition : couverture haut de gamme." },
          { title: "Tiers payant généralisé", desc: "Pas d'avance de frais chez +90% des professionnels de santé." },
          { title: "Médecines douces incluses", desc: "Ostéopathie, acupuncture, sophrologie remboursées." },
          { title: "Assistance 24/7", desc: "Aide-ménagère, garde-malade, téléconsultation incluses." },
          { title: "Résiliable à tout moment", desc: "Loi Châtel et résiliation infra-annuelle, sans frais." },
        ]}
        coverage={[
          "Hospitalisation : forfait journalier, chambre particulière, dépassements d'honoraires",
          "Dentaire : prothèses, implants, orthodontie adulte",
          "Optique : lunettes, verres progressifs, lentilles, chirurgie réfractive",
          "Audition : appareils auditifs, piles, entretien",
          "Médecine courante : consultations, analyses, radiologie",
          "Pharmacie : médicaments prescrits remboursés ou non par la Sécu",
          "Cures thermales conventionnées",
          "Médecines douces : ostéo, chiro, acupuncture, sophrologie",
        ]}
        whyUs={[
          { title: "Comparateur indépendant", desc: "+25 assureurs partenaires comparés en temps réel selon votre profil." },
          { title: "Conseiller dédié", desc: "Un expert humain pour décoder les garanties et négocier votre tarif." },
          { title: "Économies prouvées", desc: "En moyenne 312€/an d'économies sur la cotisation annuelle." },
        ]}
        faq={[
          { q: "Quel âge pour souscrire ?", a: "Nos mutuelles seniors sont accessibles dès 55 ans et sans limite d'âge maximum." },
          { q: "Y a-t-il un délai de carence ?", a: "Aucun délai sur les soins courants, l'hospitalisation et l'optique. Le dentaire peut être soumis à 3 mois selon la formule choisie." },
          { q: "Puis-je garder mes médecins habituels ?", a: "Oui, vous gardez une totale liberté de praticien. Nous gérons le tiers payant avec votre carte de mutuelle." },
          { q: "Que se passe-t-il en cas d'hospitalisation ?", a: "Prise en charge directe : aucune avance de frais. La chambre particulière et les dépassements sont couverts selon la formule." },
        ]}
      />
    </>
  );
}
