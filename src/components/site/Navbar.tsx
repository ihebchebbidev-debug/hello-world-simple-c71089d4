import * as React from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/utils";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/assurance-sante", label: "Mutuelle Santé" },
  { to: "/assurance-emprunteur", label: "Emprunteur" },
  { to: "/prevoyance", label: "Prévoyance" },
  { to: "/blog", label: "Blog" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export function Navbar({ onQuote }: { onQuote: () => void }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-xl shadow-card" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt={`${SITE.name} — assurance santé senior`} className="h-9 w-auto" width={140} height={36} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5 transition"
          >
            <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
          </a>
          <Button variant="premium" size="default" onClick={onQuote}>
            Devis gratuit
          </Button>
        </div>

        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t shadow-card"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-foreground/80 hover:bg-accent"
                >
                  {n.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" asChild>
                  <a href={`tel:${SITE.phone}`}><Phone className="h-4 w-4" /> Appeler</a>
                </Button>
                <Button variant="premium" onClick={() => { setOpen(false); onQuote(); }}>
                  Devis gratuit
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
