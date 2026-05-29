import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { SITE } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — Mutuelle Senior & Assurance Santé après 60 ans` },
      { name: "description", content: "Mutuelle senior, assurance emprunteur et prévoyance. +10 000 seniors accompagnés depuis 2013. Devis gratuit en 2 minutes." },
      { property: "og:title", content: `${SITE.name} — Mutuelle Senior` },
      { property: "og:description", content: "Le courtier spécialiste de l'assurance santé après 60 ans." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});
