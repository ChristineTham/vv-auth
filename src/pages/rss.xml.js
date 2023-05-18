import { Settings } from '../config.ts'
import { getCollection } from 'astro:content'

const posts = await getCollection('post', ({ data }) => data.draft !== true)
const sortedPosts = posts.sort((a, b) => +b.data.date - +a.data.date)

export async function get() {
  return {
    body: `<?xml version="1.0"?>
<rss xmlns:media="http://search.yahoo.com/mrss/" xmlns:dc="http://pURL.org/dc/elements/1.1/" version="2.0">
  <channel>
    <title>${Settings.site_name}</title>
    <link>${import.meta.env.SITE}</link>
    <description>${Settings.description}</description>
    <language>en</language>
    <pubDate>${Settings.buildTime.toISOString()}</pubDate>
    <lastBuildDate>${Settings.buildTime.toISOString()}</lastBuildDate>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <generator>Astro</generator>
    <managingEditor>${Settings.email}</managingEditor>
    <webMaster>${Settings.email}</webMaster>
${sortedPosts
  .map(
    (post) => `    <item>
      <title>${post.data.title}</title>
      <link>${new URL(post.slug, import.meta.env.SITE).toString()}</link>
      <author>${post.data.author})</author>
      <description>${post.data.description}</description>
      <media:content URL="${new URL(
        post.data.image.src,
        import.meta.env.SITE
      ).toString()}" type="image/jpeg" medium="image" height="${
      post.data.image.height
    }" width="${post.data.image.width}"/>
      <pubDate>${post.data.date}</pubDate>
      <guid>${new URL(post.slug, import.meta.env.SITE).toString()}</guid>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`
  }
}
