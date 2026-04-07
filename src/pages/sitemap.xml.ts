import type { APIRoute } from "astro";
import { sitemapPagePaths, toAbsoluteSiteUrl } from "../lib/discovery";

export const prerender = true;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPagePaths
  .map((path) => `  <url>\n    <loc>${escapeXml(toAbsoluteSiteUrl(path))}</loc>\n  </url>`)
  .join("\n")}
</urlset>
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
