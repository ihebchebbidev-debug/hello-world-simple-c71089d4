import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingCTAs } from "@/components/site/FloatingCTAs";
import { QuoteProvider, useQuote } from "@/components/site/QuoteModal";
import { SITE } from "@/lib/utils";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page introuvable</h2>
        <p className="mt-2 text-muted-foreground">Cette page n'existe pas ou a été déplacée.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Une erreur est survenue</h1>
        <p className="mt-2 text-sm text-muted-foreground">Vous pouvez réessayer ou retourner à l'accueil.</p>
        <div className="mt-6 flex gap-2 justify-center">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Réessayer</button>
          <a href="/" className="rounded-full border px-5 py-2 text-sm font-semibold">Accueil</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE.name} — Mutuelle Senior & Assurance Santé après 60 ans` },
      { name: "description", content: "Pro-Tection : votre courtier expert en mutuelle santé senior, assurance emprunteur et prévoyance. Devis gratuit en 2 min." },
      { name: "author", content: SITE.name },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "format-detection", content: "telephone=yes" },
      { name: "keywords", content: "mutuelle senior, mutuelle santé senior, assurance senior, assurance emprunteur senior, prévoyance senior, assurance dépendance, courtier mutuelle, devis mutuelle senior, comparateur mutuelle, complémentaire santé senior" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@protection_fr" },
      { name: "theme-color", content: "#0a1f44" },
      { name: "geo.region", content: "FR" },
      { name: "geo.placename", content: "Paris" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "InsuranceAgency",
          "@id": "#organization",
          name: SITE.name,
          alternateName: "Pro-Tection Assurances Seniors",
          description: "Courtier expert en mutuelle santé senior, assurance emprunteur et prévoyance après 60 ans.",
          email: SITE.email,
          telephone: SITE.phone,
          url: "/",
          logo: "/favicon.ico",
          image: "/favicon.ico",
          priceRange: "€€",
          foundingDate: String(SITE.founded),
          areaServed: { "@type": "Country", name: "France" },
          address: {
            "@type": "PostalAddress",
            streetAddress: "12 rue de la Paix",
            postalCode: "75002",
            addressLocality: "Paris",
            addressCountry: "FR",
          },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "19:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "17:00" },
          ],
          contactPoint: [{
            "@type": "ContactPoint",
            telephone: SITE.phone,
            contactType: "customer service",
            areaServed: "FR",
            availableLanguage: ["French"],
          }],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "1200",
            bestRating: "5",
            worstRating: "1",
          },
          knowsAbout: ["Mutuelle senior", "Assurance emprunteur", "Prévoyance", "Assurance dépendance", "Complémentaire santé"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: "/",
          inLanguage: "fr-FR",
          publisher: { "@id": "#organization" },
          potentialAction: {
            "@type": "SearchAction",
            target: "/blog?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SiteShell() {
  const { open } = useQuote();
  return (
    <>
      <Navbar onQuote={() => open()} />
      <Outlet />
      <Footer />
      <FloatingCTAs />
      <Toaster position="top-center" richColors />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <QuoteProvider>
        <SiteShell />
      </QuoteProvider>
    </QueryClientProvider>
  );
}
