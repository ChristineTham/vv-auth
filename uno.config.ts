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
    ...Array.from({ length: 3 }, (_, i) => `bg-gray-${i + 1}00`),
    ...Array.from({ length: 3 }, (_, i) => `bg-red-${i + 1}00`),
    ...Array.from({ length: 3 }, (_, i) => `bg-yellow-${i + 1}00`),
    ...Array.from({ length: 3 }, (_, i) => `bg-green-${i + 1}00`),
    ...Array.from({ length: 3 }, (_, i) => `bg-blue-${i + 1}00`),
    ...Array.from({ length: 3 }, (_, i) => `bg-indigo-${i + 1}00`),
    ...Array.from({ length: 3 }, (_, i) => `bg-purple-${i + 1}00`),
    ...Array.from({ length: 3 }, (_, i) => `bg-pink-${i + 1}00`),
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
    'i-fa6-brands-facebook',
    'i-fa6-brands-instagram',
    'i-fa6-brands-twitter',
    'i-fa6-solid-bullhorn',
    'i-fa6-solid-user-lock',
    'i-fa6-solid-passport'
  ]
})
