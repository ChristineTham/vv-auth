// uno.config.ts
import {
  defineConfig,
  presetIcons,
  presetWebFonts,
  presetAttributify,
  presetTypography,
  presetUno
} from 'unocss'
import { presetForms } from '@julr/unocss-preset-forms'

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
        // ...
      }
    }),
    presetAttributify(), // required when using attributify mode
    presetUno(), // required
    presetForms(),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        display: [
          {
            name: 'Playfair Display',
            weights: ['100', '200', '300', '400', '500', '600', '700']
          },
          {
            name: 'serif',
            provider: 'none'
          }
        ],
        heading: [
          {
            name: 'Fira Sans Condensed',
            weights: ['100', '200', '300', '400', '500', '600', '700']
          },
          {
            name: 'serif',
            provider: 'none'
          }
        ],
        sans: [
          {
            name: 'Open Sans',
            weights: ['100', '200', '300', '400', '500', '600', '700']
          },
          {
            name: 'sans-serif',
            provider: 'none'
          }
        ]
      }
    }),
    presetTypography()
  ],
  safelist: [
    'i-fa6-brands-facebook',
    'i-fa6-brands-instagram',
    'i-fa6-brands-twitter',
  ],
})
