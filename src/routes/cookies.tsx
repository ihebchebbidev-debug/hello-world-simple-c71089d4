import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/utils";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: `Gestion des cookies — ${SITE.name}` },
      { name: "description", content: "Information sur l'utilisation des cookies sur le site Pro-Tection." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Gestion des cookies" crumbs={[{ label: "Cookies" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-3xl pb-24">
        <p className="mt-4">{SITE.name} utilise uniquement les cookies strictement nécessaires au fonctionnement du site et des cookies de mesure d'audience anonymisée. Aucun cookie publicitaire tiers n'est déposé sans votre consentement.</p>
        <h2 className="text-2xl font-bold mt-8 mb-3">Types de cookies utilisés</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Cookies essentiels</strong> : session, sécurité, préférences.</li>
          <li><strong>Cookies de mesure</strong> : statistiques anonymisées d'utilisation.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-3">Gérer vos préférences</h2>
        <p>Vous pouvez désactiver les cookies via les paramètres de votre navigateur. Cela peut altérer certaines fonctionnalités du site.</p>
      </section>
    </>
  );
}
