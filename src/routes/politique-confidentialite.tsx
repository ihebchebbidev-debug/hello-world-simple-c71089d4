import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/utils";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: `Politique de confidentialité — ${SITE.name}` },
      { name: "description", content: `Politique de confidentialité et protection des données personnelles ${SITE.name}.` },
      { name: "robots", content: "noindex, follow" },
      { property: "og:url", content: "/politique-confidentialite" },
    ],
    links: [{ rel: "canonical", href: "/politique-confidentialite" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Politique de confidentialité" crumbs={[{ label: "Confidentialité" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-3xl pb-24">
        <h2 className="text-2xl font-bold mt-8 mb-3">Responsable du traitement</h2>
        <p>{SITE.name}, {SITE.address}. Délégué à la protection des données : {SITE.email}.</p>
        <h2 className="text-2xl font-bold mt-8 mb-3">Données collectées</h2>
        <p>Nom, prénom, email, téléphone, âge, ville, type d'assurance recherchée. Données nécessaires à l'établissement d'un devis et à la souscription d'un contrat d'assurance.</p>
        <h2 className="text-2xl font-bold mt-8 mb-3">Finalités</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Établir des devis personnalisés</li>
          <li>Vous recontacter dans le cadre de votre demande</li>
          <li>Vous adresser nos communications (newsletter, opt-in)</li>
          <li>Respecter nos obligations légales (LCB-FT, DDA)</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-3">Durée de conservation</h2>
        <p>5 ans pour les prospects, durée du contrat + 5 ans pour les clients souscripteurs.</p>
        <h2 className="text-2xl font-bold mt-8 mb-3">Vos droits</h2>
        <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'opposition, d'effacement et de portabilité. Pour les exercer : {SITE.email}. Vous pouvez également saisir la CNIL.</p>
      </section>
    </>
  );
}
