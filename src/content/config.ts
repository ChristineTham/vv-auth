// 1. Import utilities from `astro:content`
import { z, defineCollection, reference } from 'astro:content'

// 2. Define a schema for each collection you'd like to validate.
const postCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    author: reference('author'),
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: z.string().optional(),
    categories: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    geo: z.string().optional(),
    gallery: z.string().optional()
  })
})

const categoryCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      plural: z.string().optional(),
      description: z.string().optional(),
      image: image()
    })
})

const authorCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      website: z.string().optional()
    })
})

const socialCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    icon: z.string(),
    url: z.string().url(),
  })
})

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  post: postCollection,
  category: categoryCollection,
  author: authorCollection,
  social: socialCollection,
}
