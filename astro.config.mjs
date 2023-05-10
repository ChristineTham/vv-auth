// astro.config.ts
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

export default defineConfig({
  experimental: {
    assets: true
  },
  integrations: [
    UnoCSS({
      injectReset: true // or a path to the reset file
    }),
  ],
})