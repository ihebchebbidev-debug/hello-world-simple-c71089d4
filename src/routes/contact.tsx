import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { SITE } from "@/lib/utils";
import { submitCallbackRequest } from "@/lib/leads.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${SITE.name} | Conseiller mutuelle senior` },
      { name: "description", content: `Contactez ${SITE.name} : ${SITE.phoneDisplay}, ${SITE.email}. Un conseiller vous rappelle gratuitement sous 24h.` },
      { property: "og:title", content: `Contactez ${SITE.name}` },
      { property: "og:description", content: "Un conseiller dédié vous rappelle gratuitement sous 24h." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Nom requis").max(120),
  phone: z.string().trim().min(6, "Téléphone requis").max(32),
  preferred_time: z.string().trim().max(80).optional(),
});
type Vals = z.infer<typeof schema>;

function ContactPage() {
  const submit = useServerFn(submitCallbackRequest);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Vals>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Vals) => {
    try {
      const res = await submit({ data });
      if (res?.ok) {
        toast.success("Merci ! Un conseiller vous rappelle sous 24h.");
        reset();
      } else toast.error(res?.error ?? "Une erreur est survenue.");
    } catch {
      toast.error("Erreur réseau. Merci de réessayer.");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        subtitle="Un conseiller dédié vous rappelle gratuitement sous 24h, sans engagement."
        crumbs={[{ label: "Contact" }]}
      />
      <section className="container mx-auto px-4 lg:px-8 max-w-6xl pb-24">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <Phone className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Téléphone gratuit</h3>
              <a href={`tel:${SITE.phone}`} className="text-2xl font-bold text-primary">{SITE.phoneDisplay}</a>
              <p className="text-sm text-foreground/60 mt-1">Du lundi au vendredi, 9h–19h</p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <Mail className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Email</h3>
              <a href={`mailto:${SITE.email}`} className="text-primary font-medium">{SITE.email}</a>
              <p className="text-sm text-foreground/60 mt-1">Réponse sous 24h ouvrées</p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <MapPin className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Adresse</h3>
              <p className="text-sm text-foreground/70">{SITE.address}</p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <Clock className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Horaires</h3>
              <p className="text-sm text-foreground/70">Lun–Ven : 9h–19h<br />Sam : 10h–17h</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border bg-card p-8 shadow-elegant space-y-4 h-fit">
            <h2 className="text-2xl font-bold">Être rappelé gratuitement</h2>
            <p className="text-sm text-foreground/70">Laissez vos coordonnées, un conseiller vous rappelle quand vous le souhaitez.</p>
            <Input placeholder="Nom complet *" {...register("full_name")} aria-invalid={!!errors.full_name} />
            <Input placeholder="Téléphone *" type="tel" {...register("phone")} aria-invalid={!!errors.phone} />
            <Input placeholder="Créneau préféré (ex: demain matin)" {...register("preferred_time")} />
            <Button type="submit" variant="premium" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Envoi…" : "Être rappelé gratuitement"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">🔒 Vos données sont confidentielles. Aucun engagement.</p>
          </form>
        </div>
      </section>
    </>
  );
}
