import { Check, ShieldCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/site/QuoteModal";
import { InlineQuoteForm } from "@/components/site/InlineQuoteForm";
import { SITE } from "@/lib/utils";

export function ProductLanding({
  title,
  intro,
  image,
  benefits,
  coverage,
  whyUs,
  faq,
  quoteType,
}: {
  title: string;
  intro: string;
  image: string;
  benefits: { title: string; desc: string }[];
  coverage: string[];
  whyUs: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  quoteType: string;
}) {
  const { open } = useQuote();
  return (
    <main className="pb-24">
      <section className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">{title}</h2>
            <p className="text-foreground/70 text-lg leading-relaxed mb-6">{intro}</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="premium" size="lg" onClick={() => open(quoteType)}>Devis gratuit en 2 min</Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${SITE.phone}`}><Phone className="h-4 w-4" /> {SITE.phoneDisplay}</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img src={image} alt={title} className="rounded-3xl shadow-elegant w-full h-auto" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 max-w-6xl mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">Les avantages clés</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border bg-card p-6 shadow-card">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-foreground/70">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 max-w-4xl mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">Ce qui est couvert</h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {coverage.map((c) => (
            <li key={c} className="flex items-start gap-3 rounded-xl border bg-card p-4">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" /> <span className="text-sm">{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container mx-auto px-4 lg:px-8 max-w-6xl mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">Pourquoi choisir {SITE.name} ?</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {whyUs.map((w) => (
            <div key={w.title} className="rounded-2xl bg-gradient-hero p-6 border">
              <h3 className="font-semibold text-lg mb-2 text-primary">{w.title}</h3>
              <p className="text-sm text-foreground/70">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 max-w-3xl mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">Questions fréquentes</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-2xl border bg-card p-5">
              <summary className="cursor-pointer font-semibold flex justify-between items-center">
                {f.q}<span className="ml-2 text-primary group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 max-w-3xl mt-20">
        <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-8 md:p-12 shadow-elegant">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Recevez votre devis personnalisé gratuitement</h2>
            <p className="mt-2 text-white/80">Un conseiller vous rappelle sous 24h, sans engagement.</p>
          </div>
          <InlineQuoteForm insuranceType={quoteType} variant="onPrimary" />
          <div className="mt-4 text-center">
            <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
              <Phone className="h-4 w-4" /> Préférez parler ? {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
