import lunr from 'lunr'
import { getCollection } from 'astro:content'

const posts = await getCollection('post', ({ data }) => data.draft !== true)

const options = { keys: ['title', 'description', 'body'] }

const idx = lunr(function () {
  this.ref('slug')
  this.field('data.title')
  this.field('data.description')
  this.field('body')

  posts.forEach(function (post) {
    this.add(post)
  }, this)
})

export async function get() {
  const body = JSON.stringify(idx)
  return { body }
}
