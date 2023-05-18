// astro.config.ts
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';
import alpinejs from "@astrojs/alpinejs";

// import netlify from "@astrojs/netlify/functions"

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // output: 'server',
  experimental: {
    assets: true
  },
  site: 'https://vv-auth.netlify.app',
  integrations: [UnoCSS({
    injectReset: true // or a path to the reset file
  }), alpinejs(), sitemap()]
  // adapter: netlify()
});