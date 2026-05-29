import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="mb-12 rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Recevez nos conseils seniors par email</h2>
            <p className="text-sm text-white/70 mt-1">1 email/mois, des astuces santé et économies sur votre mutuelle. Désinscription en 1 clic.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <img src={logo} alt={`Logo ${SITE.name} — courtier mutuelle senior`} className="h-10 w-auto bg-white rounded-lg p-1" width={140} height={40} />
            <p className="text-sm text-white/70 max-w-sm">
              Expert en assurance santé senior, mutuelle retraite et protection familiale depuis {SITE.founded}. Plus de 10 000 clients accompagnés en France.
            </p>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href={`tel:${SITE.phone}`} className="hover:text-white">{SITE.phoneDisplay}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {SITE.address}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Nos solutions</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/assurance-sante" className="hover:text-white">Mutuelle Santé Senior</Link></li>
              <li><Link to="/assurance-emprunteur" className="hover:text-white">Assurance Emprunteur</Link></li>
              <li><Link to="/prevoyance" className="hover:text-white">Prévoyance & Famille</Link></li>
              <li><Link to="/devis" className="hover:text-white">Demander un devis</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">À propos</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/a-propos" className="hover:text-white">Qui sommes-nous</Link></li>
              <li><Link to="/partenaires" className="hover:text-white">Nos partenaires</Link></li>
              <li><Link to="/temoignages" className="hover:text-white">Avis clients</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/blog" className="hover:text-white">Blog senior</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/mentions-legales" className="hover:text-white">Mentions légales</Link></li>
              <li><Link to="/politique-confidentialite" className="hover:text-white">Confidentialité</Link></li>
              <li><Link to="/cookies" className="hover:text-white">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-white/60">
          <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
          <p>Courtier en assurance enregistré ORIAS — Conseil personnalisé et indépendant.</p>
        </div>
      </div>
    </footer>
  );
}
