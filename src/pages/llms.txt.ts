import type { APIRoute } from "astro";
import { siteConfig } from "../config/site";
import { discoveryPages, toAbsoluteSiteUrl } from "../lib/discovery";

export const prerender = true;

const renderLinks = (pages: readonly { title: string; path: string; description: string }[]) =>
  pages
    .map((page) => `- [${page.title}](${toAbsoluteSiteUrl(page.path)}): ${page.description}`)
    .join("\n");

const body = `# ${siteConfig.name}

> ${siteConfig.aiDiscovery.summary}

${siteConfig.aiDiscovery.status}

Important notes:
- ${siteConfig.aiDiscovery.privacyModel}
- Not for: ${siteConfig.aiDiscovery.notFor[0] ?? "Voice of Self is not therapy, crisis support, diagnosis, or clinical care."}
- The public website is the product's marketing, legal, support, and waitlist surface rather than the full app itself.

## Main Pages
${renderLinks(discoveryPages.main)}

## Legal
${renderLinks(discoveryPages.legal)}

## Optional
${renderLinks(discoveryPages.optional)}
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
