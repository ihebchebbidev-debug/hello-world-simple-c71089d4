import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitQuoteRequest } from "@/lib/leads.functions";

const schema = z.object({
  full_name: z.string().trim().min(2, "Nom requis").max(120),
  email: z.string().trim().email("Email invalide"),
  phone: z.string().trim().min(6, "Téléphone requis").max(32),
  city: z.string().trim().max(80).optional(),
});
type Vals = z.infer<typeof schema>;

export function InlineQuoteForm({
  insuranceType = "Mutuelle santé senior",
  variant = "light",
  cta = "Recevoir mon devis gratuit",
}: {
  insuranceType?: string;
  variant?: "light" | "onPrimary";
  cta?: string;
}) {
  const submit = useServerFn(submitQuoteRequest);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Vals>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Vals) => {
    try {
      const res = await submit({ data: { ...data, insurance_type: insuranceType } });
      if (res?.ok) {
        toast.success("Demande envoyée ! Un conseiller vous rappelle sous 24h.");
        reset();
      } else toast.error(res?.error ?? "Une erreur est survenue.");
    } catch {
      toast.error("Erreur réseau. Merci de réessayer.");
    }
  };

  const fieldCls =
    variant === "onPrimary"
      ? "bg-white/95 text-foreground placeholder:text-foreground/50 border-white/30"
      : "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-2" aria-label="Demande de devis">
      <Input className={fieldCls} placeholder="Nom complet *" autoComplete="name" {...register("full_name")} aria-invalid={!!errors.full_name} />
      <Input className={fieldCls} placeholder="Email *" type="email" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} />
      <Input className={fieldCls} placeholder="Téléphone *" type="tel" autoComplete="tel" {...register("phone")} aria-invalid={!!errors.phone} />
      <Input className={fieldCls} placeholder="Ville (optionnel)" autoComplete="address-level2" {...register("city")} />
      <div className="sm:col-span-2">
        <Button
          type="submit"
          size="lg"
          variant={variant === "onPrimary" ? "secondary" : "premium"}
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi…" : cta}
        </Button>
        <p className={`mt-2 text-xs text-center ${variant === "onPrimary" ? "text-white/80" : "text-muted-foreground"}`}>
          🔒 Sans engagement · Données 100% confidentielles · Réponse sous 24h
        </p>
      </div>
    </form>
  );
}
