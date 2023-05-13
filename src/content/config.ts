// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'

// 2. Define a schema for each collection you'd like to validate.
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    category: z.string(),
    date: z.date(),
    geo: z.object({
      type: z.literal('Feature'),
      properties: z.object({}),
      geometry: z.object({
        coordinates: z.number().array(),
        type: z.literal('Point')
      })
    }).optional()
  })
})

const categoryCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional()
  })
})

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
  category: categoryCollection
}
