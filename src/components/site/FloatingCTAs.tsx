import { Phone } from "lucide-react";
import { SITE } from "@/lib/utils";

export function FloatingCTAs() {
  return (
    <a
      href={`tel:${SITE.phone}`}
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-gradient-primary text-primary-foreground py-3 px-4 flex items-center justify-center gap-2 font-semibold shadow-elegant"
    >
      <Phone className="h-4 w-4" /> Appeler un conseiller — gratuit
    </a>
  );
}
