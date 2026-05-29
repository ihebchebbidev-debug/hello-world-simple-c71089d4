// Sitemap dynamic route — serves XML at /sitemap.xml
import { createFileRoute } from "@tanstack/react-router";
import { ARTICLES, CATEGORIES } from "@/lib/blog-data";

const STATIC_PATHS = [
  "/", "/a-propos", "/contact", "/assurance-sante", "/assurance-emprunteur",
  "/prevoyance", "/dependance", "/devis", "/faq", "/temoignages",
  "/partenaires", "/blog",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const base = `${url.protocol}//${url.host}`;
        const today = new Date().toISOString().split("T")[0];
        const urls = [
          ...STATIC_PATHS.map((p) => ({ loc: base + p, lastmod: today, priority: p === "/" ? "1.0" : "0.8" })),
          ...CATEGORIES.map((c) => ({ loc: `${base}/blog?cat=${c.slug}`, lastmod: today, priority: "0.7" })),
          ...ARTICLES.map((a) => ({ loc: `${base}/blog/${a.slug}`, lastmod: a.updatedAt.split("T")[0], priority: "0.6" })),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
