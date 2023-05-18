import { getCollection } from 'astro:content'

const posts = await getCollection('post', ({ data }) => data.draft !== true)

export async function get() {
  const body = JSON.stringify(posts)
  return { body }
}
