// astro.config.ts
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';
import alpinejs from "@astrojs/alpinejs";

// import netlify from "@astrojs/netlify/functions"

// https://astro.build/config
export default defineConfig({
  // output: 'server',
  experimental: {
    assets: true
  },
  integrations: [UnoCSS({
    injectReset: true // or a path to the reset file
  }), alpinejs()],
  // adapter: netlify()
});