import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: { label: string; to?: string }[];
}) {
  const breadcrumbJsonLd = crumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "/" },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.label,
        ...(c.to ? { item: c.to } : {}),
      })),
    ],
  } : null;

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-hero overflow-hidden">
      {breadcrumbJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      )}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(60% 60% at 50% 0%, hsl(var(--primary-glow)/0.35), transparent)" }} />
      <div className="container relative mx-auto px-4 lg:px-8 max-w-4xl text-center">
        {crumbs.length > 0 && (
          <nav aria-label="Fil d'Ariane" className="mb-4 flex flex-wrap items-center justify-center gap-1 text-xs text-foreground/60">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3" />
                {c.to ? <Link to={c.to} className="hover:text-primary">{c.label}</Link> : <span>{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <span className="inline-block rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase px-3 py-1 mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">{title}</span>
        </h1>
        {subtitle && <p className="mt-5 text-lg text-foreground/70 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}
