import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/site/QuoteModal";
import { SITE } from "@/lib/utils";

export const Route = createFileRoute("/devis")({
  head: () => ({
    meta: [
      { title: `Devis Gratuit Mutuelle Senior — ${SITE.name}` },
      { name: "description", content: "Recevez votre devis personnalisé en 2 minutes. Un conseiller dédié vous rappelle sous 24h. Sans engagement, 100% gratuit." },
      { property: "og:title", content: "Devis Mutuelle Senior gratuit" },
      { property: "og:description", content: "Devis personnalisé en 2 minutes, sans engagement." },
      { property: "og:url", content: "/devis" },
    ],
    links: [{ rel: "canonical", href: "/devis" }],
  }),
  component: Page,
});

function Page() {
  const { open } = useQuote();
  return (
    <>
      <PageHero eyebrow="Devis" title="Votre devis gratuit en 2 minutes" subtitle="Comparez +25 assureurs et économisez en moyenne 312€/an. Sans engagement." crumbs={[{ label: "Devis" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-5xl pb-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Pourquoi demander un devis chez {SITE.name} ?</h2>
            <ul className="space-y-3">
              {[
                "Comparaison de +25 mutuelles partenaires",
                "Conseiller dédié humain et expert",
                "Économies moyennes de 312 €/an",
                "Sans questionnaire médical intrusif",
                "Aucun engagement, 100% gratuit",
                "Réponse sous 24h ouvrées",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3"><Check className="h-5 w-5 text-primary shrink-0 mt-0.5" /> <span>{b}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-10 shadow-elegant text-center">
            <h3 className="text-2xl font-bold mb-3">Lancer mon devis maintenant</h3>
            <p className="text-white/80 mb-6">Réponse personnalisée par un conseiller dédié.</p>
            <Button size="xl" variant="secondary" className="w-full" onClick={() => open()}>
              Recevoir mon devis gratuit
            </Button>
            <p className="text-xs text-white/70 mt-4">🔒 Vos données restent confidentielles</p>
          </div>
        </div>
      </section>
    </>
  );
}
