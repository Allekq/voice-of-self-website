import type { APIRoute } from "astro";
import { toAbsoluteSiteUrl } from "../lib/discovery";

export const prerender = true;

const body = `User-agent: *
Allow: /

Sitemap: ${toAbsoluteSiteUrl("/sitemap.xml")}
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
