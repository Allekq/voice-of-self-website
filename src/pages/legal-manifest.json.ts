import type { APIRoute } from "astro";
import { legalManifest } from "../config/site";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(legalManifest, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
