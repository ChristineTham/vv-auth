// uno.config.ts
import {
  defineConfig,
  presetWebFonts,
  presetAttributify, presetTypography, presetUno
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // required when using attributify mode
    presetUno(), // required
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        // these will extend the default theme
        sans: ['Overpass'],
        display: ['Playfair Display'],
        heading: ['Fira Sans Condensed']
      },
    }),
    presetTypography(),
  ],
})