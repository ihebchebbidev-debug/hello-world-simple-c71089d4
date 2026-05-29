import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ShieldHeartIcon, HomeShieldIcon, FamilyIcon, StethoscopeIcon,
  HandshakeIcon, ClockIcon, BadgeCheckIcon, HeadsetIcon, SeniorIcon,
} from "@/components/icons/BrandIcons";
import { useQuote } from "@/components/site/QuoteModal";
import { SITE } from "@/lib/utils";
import hero from "@/assets/hero-family.jpg";
import advisor from "@/assets/about-advisor.jpg";
import { ARTICLES } from "@/lib/blog-data";
import { InlineQuoteForm } from "@/components/site/InlineQuoteForm";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function HomePage() {
  const { open } = useQuote();

  return (
    <main className="pb-20 md:pb-0">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero pt-28 pb-20 lg:pt-36 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-soft pointer-events-none" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp} className="space-y-7">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.05]">
                Votre santé senior,{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  notre engagement depuis {SITE.founded}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl text-pretty">
                Pro-Tection vous accompagne pour trouver la <strong>meilleure mutuelle senior</strong>,
                adaptée à vos besoins et votre budget. Conseil indépendant, sans engagement, et expert
                en assurance santé après 60 ans.
              </p>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex -space-x-2">
                  {["M", "J", "B", "C"].map((i, idx) => (
                    <div
                      key={idx}
                      className="h-9 w-9 rounded-full ring-2 ring-white grid place-items-center text-xs font-bold text-primary-foreground bg-gradient-primary shadow-card"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 text-gold leading-none">{"★★★★★"}</div>
                  <p className="text-xs text-muted-foreground mt-0.5"><strong className="text-foreground">4.9/5</strong> · +1 200 avis clients</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="premium" size="xl" onClick={() => open("Mutuelle santé senior")}>
                  Devis gratuit en 2 min <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <a href={`tel:${SITE.phone}`}>Être rappelé</a>
                </Button>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70">
                {["Conseillers experts à votre écoute", "Accompagnement 100% personnalisé", "Meilleures offres du marché"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {t}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-primary rounded-[2.5rem] blur-2xl opacity-25" />
              <img
                src={hero}
                alt="Famille senior épanouie, protégée par Pro-Tection"
                width={1600}
                height={1200}
                className="relative rounded-[2rem] shadow-elegant object-cover w-full h-[480px] lg:h-[560px]"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 max-w-[230px]"
              >
                <div className="flex items-center gap-3">
                  <BadgeCheckIcon size={48} />
                  <div>
                    <p className="text-2xl font-bold">+10 000</p>
                    <p className="text-xs text-muted-foreground">clients nous font confiance</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Social proof bar */}
          <motion.div {...fadeUp} className="mt-16 lg:mt-20 rounded-3xl bg-gradient-navy text-navy-foreground p-6 md:p-8 shadow-elegant">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { n: "2013", l: "À vos côtés depuis" },
                { n: "10 000+", l: "Clients accompagnés" },
                { n: "20+", l: "Partenaires assureurs" },
                { n: "24h", l: "Délai de réponse" },
              ].map((s) => (
                <div key={s.l} className="text-center md:text-left">
                  <p className="text-3xl md:text-4xl font-bold">{s.n}</p>
                  <p className="text-sm text-white/70 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">Nos solutions</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
              Des solutions adaptées à chaque étape de votre vie
            </h2>
            <div className="mt-6 h-1 w-16 bg-gradient-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: StethoscopeIcon, title: "Mutuelle Santé Senior", desc: "Des garanties complètes pour prendre soin de vous et de votre famille, avec un remboursement renforcé sur l'optique, le dentaire et l'hospitalisation.", to: "/assurance-sante" },
              { icon: HomeShieldIcon, title: "Assurance Emprunteur", desc: "Protégez votre projet immobilier et sécurisez votre prêt en toute sérénité. Économisez jusqu'à 20 000 € grâce à la loi Lemoine.", to: "/assurance-emprunteur" },
              { icon: FamilyIcon, title: "Prévoyance & Famille", desc: "Anticipez les imprévus et protégez vos proches avec des solutions sur mesure : obsèques, dépendance, capital décès.", to: "/prevoyance" },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="group relative rounded-3xl bg-card p-8 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border border-border/60 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" />
                <div className="relative">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary-glow/10 mb-2">
                    <s.icon size={56} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <Link to={s.to} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    En savoir plus <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 lg:py-28 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp} className="relative">
              <img src={advisor} alt="Conseiller Pro-Tection avec un couple senior" width={1400} height={1000} loading="lazy" className="rounded-3xl shadow-elegant w-full h-[420px] object-cover" />
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="absolute -bottom-6 left-6 right-6 md:right-auto glass-card rounded-2xl p-5 md:max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <ShieldHeartIcon size={48} />
                  <p className="text-sm font-semibold leading-tight">Un accompagnement complet et humain à chaque étape</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div {...fadeUp} className="space-y-6">
              <p className="text-xs font-bold tracking-widest text-primary uppercase">À propos de nous</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
                Votre confiance est notre plus belle réussite
              </h2>
              <p className="text-muted-foreground">
                Depuis plus de 10 ans, Pro-Tection met son expertise et son engagement au service
                de ses clients. Notre priorité : vous offrir un accompagnement complet, humain et transparent.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: HeadsetIcon, t: "Un suivi personnalisé à chaque étape" },
                  { icon: BadgeCheckIcon, t: "Des conseillers disponibles et réactifs" },
                  { icon: HandshakeIcon, t: "Des partenariats solides avec les meilleures compagnies" },
                  { icon: ClockIcon, t: "Réponse garantie sous 24 heures" },
                ].map((it) => (
                  <li key={it.t} className="flex items-center gap-3">
                    <it.icon size={40} />
                    <span className="font-medium">{it.t}</span>
                  </li>
                ))}
              </ul>
              <Button variant="premium" size="lg" asChild>
                <Link to="/a-propos">Découvrir notre histoire <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16 border-y border-border/60">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">Nos partenaires</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Des compagnies de confiance à nos côtés</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto items-center">
            {["AXA", "Allianz", "Generali", "April", "Malakoff Humanis"].map((p) => (
              <div key={p} className="rounded-2xl border border-border/60 bg-card py-5 px-4 font-bold text-foreground/70 text-lg shadow-card hover:shadow-elegant transition">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">Témoignages</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Ils nous font confiance</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "Martine D.", age: "68 ans", initial: "M", t: "Pro-Tection m'a trouvé une mutuelle qui me fait économiser 480 €/an avec de meilleures garanties dentaires. Service impeccable." },
              { n: "Jacques L.", age: "72 ans", initial: "J", t: "Conseiller à l'écoute, explications claires, démarches simplifiées. Je recommande à tous mes amis retraités." },
              { n: "Famille Bernard", age: "Couple", initial: "B", t: "Pour l'assurance emprunteur de notre prêt, Pro-Tection nous a fait économiser 14 000 € sur 20 ans. Bluffant." },
            ].map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="relative rounded-3xl bg-card p-7 shadow-card border border-border/60 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-6 right-6 text-6xl leading-none text-primary/10 font-serif select-none">"</div>
                <div className="flex gap-1 text-gold mb-3">{"★★★★★"}</div>
                <p className="text-foreground/80 italic leading-relaxed relative">{t.t}</p>
                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border/60">
                  <div className="h-11 w-11 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold">{t.initial}</div>
                  <div>
                    <p className="font-semibold text-sm leading-tight">{t.n}</p>
                    <p className="text-xs text-muted-foreground">{t.age}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 lg:py-28 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">Comment ça marche</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
              Votre meilleure mutuelle en 3 étapes simples
            </h2>
            <p className="mt-4 text-muted-foreground">
              Sans engagement, 100% gratuit. Un conseiller dédié vous accompagne du devis à la signature.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
            {[
              { n: "01", t: "Faites votre demande", d: "Remplissez un formulaire en 2 minutes ou appelez-nous directement. Aucune information bancaire requise." },
              { n: "02", t: "Recevez vos devis", d: "Nous comparons +25 assureurs partenaires et sélectionnons les 3 meilleures offres pour votre profil." },
              { n: "03", t: "Soyez couvert(e)", d: "Vous choisissez sereinement. Notre conseiller gère la résiliation de votre ancien contrat et l'activation." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="relative rounded-3xl bg-card border border-border/60 p-8 shadow-card hover:shadow-elegant transition-all hover:-translate-y-1 text-center"
              >
                <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-primary text-primary-foreground grid place-items-center text-2xl font-bold shadow-elegant">
                  {s.n}
                </div>
                <h3 className="mt-5 text-xl font-bold">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CTA WITH INLINE FORM */}

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div {...fadeUp} className="rounded-3xl bg-gradient-primary text-primary-foreground p-8 md:p-12 shadow-elegant relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold mb-4">
                  <HeadsetIcon size={20} /> Devis 100% gratuit
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  Recevez votre devis mutuelle senior en 2 minutes
                </h2>
                <p className="text-white/85 mt-3 text-sm md:text-base">
                  Comparez +25 assureurs partenaires. Économisez en moyenne <strong>312€/an</strong>. Sans engagement.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button variant="outlineWhite" size="lg" asChild>
                    <a href={`tel:${SITE.phone}`}>📞 {SITE.phoneDisplay}</a>
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur p-5 md:p-6 border border-white/20">
                <InlineQuoteForm insuranceType="Mutuelle santé senior" variant="onPrimary" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-20 lg:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">Blog senior</p>
            <h2 className="text-3xl md:text-4xl font-bold">Conseils d'experts pour votre santé</h2>
            <p className="mt-3 text-muted-foreground">Nos articles les plus lus pour mieux vivre et mieux vous protéger.</p>
          </div>
          <BlogPreviewGrid />
        </div>
      </section>

      {/* COVERAGE GRID */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">Pourquoi Pro-Tection</p>
            <h2 className="text-3xl md:text-4xl font-bold">Une expertise reconnue, un service humain</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { i: SeniorIcon, t: "Spécialiste 60+", d: "Expert en santé senior" },
              { i: ClockIcon, t: "Réponse 24h", d: "Devis ultra-rapide" },
              { i: HandshakeIcon, t: "Sans engagement", d: "Comparez librement" },
              { i: ShieldHeartIcon, t: "100% indépendant", d: "Conseil objectif" },
            ].map((b) => (
              <div key={b.t} className="rounded-3xl bg-card border border-border/60 p-6 text-center shadow-card hover:shadow-elegant transition">
                <div className="flex justify-center"><b.i size={56} /></div>
                <p className="mt-3 font-bold">{b.t}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function BlogPreviewGrid() {
  const [count, setCount] = React.useState(6);
  const visible = ARTICLES.slice(0, count);
  const canLoadMore = count < ARTICLES.length;
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visible.map((a) => (
          <Link
            key={a.slug}
            to="/blog/$slug"
            params={{ slug: a.slug }}
            className="group rounded-3xl bg-card border border-border/60 overflow-hidden shadow-card hover:shadow-elegant transition-all"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={a.image}
                alt={a.imageAlt}
                loading="lazy"
                width={800}
                height={500}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <p className="text-xs font-bold tracking-widest text-primary uppercase">
                {a.category.replace(/-/g, " ")}
              </p>
              <h3 className="mt-2 font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        {canLoadMore && count < 12 && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => setCount((c) => Math.min(c + 3, ARTICLES.length))}
          >
            Charger 3 articles de plus
          </Button>
        )}
        <Button size="lg" asChild>
          <Link to="/blog">
            Voir tous les articles ({ARTICLES.length}) <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </>
  );
}
