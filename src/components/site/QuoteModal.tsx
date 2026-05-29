import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { submitQuoteRequest } from "@/lib/leads.functions";

const schema = z.object({
  insurance_type: z.string().min(2),
  full_name: z.string().trim().min(2, "Nom requis").max(120),
  email: z.string().trim().email("Email invalide"),
  phone: z.string().trim().min(6, "Téléphone requis").max(32),
  age: z.string().optional(),
  city: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
});
type FormVals = z.infer<typeof schema>;

export function QuoteModal({
  open,
  onOpenChange,
  defaultType = "Mutuelle santé senior",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  defaultType?: string;
}) {
  const submit = useServerFn(submitQuoteRequest);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormVals>({
    resolver: zodResolver(schema),
    defaultValues: { insurance_type: defaultType },
  });

  React.useEffect(() => {
    if (open) reset({ insurance_type: defaultType });
  }, [open, defaultType, reset]);

  const onSubmit = async (data: FormVals) => {
    try {
      const ageNum = data.age && data.age.trim() !== "" ? Number(data.age) : undefined;
      const payload = { ...data, age: Number.isFinite(ageNum) ? (ageNum as number) : undefined };
      const res = await submit({ data: payload });
      if (res?.ok) {
        toast.success("Demande envoyée ! Un conseiller vous rappelle sous 24h.");
        onOpenChange(false);
        reset();
      } else {
        toast.error(res?.error ?? "Une erreur est survenue.");
      }
    } catch {
      toast.error("Erreur réseau. Merci de réessayer.");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-navy/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-background p-6 md:p-8 shadow-elegant max-h-[92vh] overflow-y-auto">
          <Dialog.Title className="sr-only">Demander un devis gratuit</Dialog.Title>
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Fermer"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Devis gratuit en 2 minutes</h2>
              <p className="text-sm text-muted-foreground">Un conseiller vous rappelle sous 24h.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-foreground/70">Type d'assurance</label>
              <select {...register("insurance_type")} className="mt-1 flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm">
                <option>Mutuelle santé senior</option>
                <option>Assurance emprunteur</option>
                <option>Prévoyance & obsèques</option>
                <option>Assurance dépendance</option>
                <option>Autre</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Nom complet *" {...register("full_name")} aria-invalid={!!errors.full_name} />
              <Input placeholder="Âge" type="number" {...register("age")} />
            </div>
            <Input placeholder="Email *" type="email" {...register("email")} aria-invalid={!!errors.email} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Téléphone *" type="tel" {...register("phone")} aria-invalid={!!errors.phone} />
              <Input placeholder="Ville" {...register("city")} />
            </div>
            <Textarea placeholder="Votre message (optionnel)" {...register("message")} />
            <Button type="submit" variant="premium" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Envoi…" : "Recevoir mon devis gratuit"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              🔒 Données 100% confidentielles. Sans engagement.
            </p>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// React context for global access
const QuoteCtx = React.createContext<{ open: (t?: string) => void } | null>(null);
export const useQuote = () => {
  const c = React.useContext(QuoteCtx);
  if (!c) throw new Error("useQuote must be inside QuoteProvider");
  return c;
};

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("Mutuelle santé senior");
  return (
    <QuoteCtx.Provider value={{ open: (t) => { if (t) setType(t); setOpen(true); } }}>
      {children}
      <QuoteModal open={open} onOpenChange={setOpen} defaultType={type} />
    </QuoteCtx.Provider>
  );
}
