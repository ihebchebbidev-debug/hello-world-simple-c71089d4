import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/lib/leads.functions";

const schema = z.object({ email: z.string().trim().email("Email invalide") });
type Vals = z.infer<typeof schema>;

export function NewsletterForm() {
  const submit = useServerFn(subscribeNewsletter);
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<Vals>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: Vals) => {
    try {
      const res = await submit({ data });
      if (res?.ok) {
        toast.success("Merci ! Vous êtes inscrit·e à notre newsletter.");
        reset();
      } else toast.error(res?.error ?? "Une erreur est survenue.");
    } catch {
      toast.error("Erreur réseau. Merci de réessayer.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2" aria-label="Inscription newsletter">
      <Input
        type="email"
        autoComplete="email"
        placeholder="Votre email"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        {...register("email")}
        aria-invalid={!!errors.email}
      />
      <Button type="submit" size="default" variant="secondary" disabled={isSubmitting}>
        {isSubmitting ? "…" : "S'inscrire"}
      </Button>
    </form>
  );
}
