import { defineConfig } from "astro/config";
import { siteBasePath, siteOrigin } from "./site.config.mjs";

export default defineConfig({
  site: siteOrigin,
  base: siteBasePath,
});
