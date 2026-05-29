import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/utils";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: `Mentions légales — ${SITE.name}` },
      { name: "description", content: `Mentions légales du site ${SITE.name}, courtier en assurance.` },
      { name: "robots", content: "noindex, follow" },
      { property: "og:url", content: "/mentions-legales" },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Mentions légales" crumbs={[{ label: "Mentions légales" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-3xl pb-24 prose prose-slate">
        <h2 className="text-2xl font-bold mt-8 mb-3">Éditeur du site</h2>
        <p>{SITE.name} SAS — Capital social 50 000 €<br />Siège : {SITE.address}<br />RCS Paris B 123 456 789<br />TVA : FR12345678901<br />Téléphone : {SITE.phoneDisplay}<br />Email : {SITE.email}</p>
        <h2 className="text-2xl font-bold mt-8 mb-3">Directeur de la publication</h2>
        <p>Le directeur de la publication est le représentant légal de {SITE.name}.</p>
        <h2 className="text-2xl font-bold mt-8 mb-3">Hébergement</h2>
        <p>Lovable Cloud — Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA.</p>
        <h2 className="text-2xl font-bold mt-8 mb-3">Activité de courtage</h2>
        <p>{SITE.name} exerce l'activité de courtier en assurance, immatriculé à l'ORIAS sous le numéro 13 000 000 (vérifiable sur www.orias.fr). Soumis au contrôle de l'ACPR — 4 place de Budapest, 75009 Paris.</p>
        <h2 className="text-2xl font-bold mt-8 mb-3">Propriété intellectuelle</h2>
        <p>L'ensemble des contenus (textes, images, logos) est protégé par le droit d'auteur. Toute reproduction sans autorisation est interdite.</p>
        <h2 className="text-2xl font-bold mt-8 mb-3">Médiateur de la consommation</h2>
        <p>En cas de litige, vous pouvez saisir la Médiation de l'Assurance — La Médiation de l'Assurance, TSA 50110, 75441 Paris cedex 09 — www.mediation-assurance.org.</p>
      </section>
    </>
  );
}
