import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

import favicons from "astro-favicons";

export default defineConfig({
  integrations: [react(), sitemap(), favicons({ name: "AWriter" })],
  devToolbar: { enabled: false },
});
