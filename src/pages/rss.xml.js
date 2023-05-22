import { Settings } from '../config.ts'
import { getCollection, getEntry } from 'astro:content'

// import defaultImage from '../assets/sunrise.jpeg'
const defaultauthor = await getEntry('author', 'default')

export async function get() {
  const posts = await getCollection(
    'post',
    ({ data }) =>
      data.draft !== true && !data.categories.includes('Member Exclusive')
  )
  const sortedPosts = posts.sort((a, b) => +b.data.date - +a.data.date)

  // cannot use posts.forEach() due to race conditions
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    // const categoriesdetail = await getEntries(post.data.categories)

    // posts[i].image = post.data.image || defaultImage

    // if (posts[i].image.format == 'jpg') {
    //   posts[i].image.format = 'jpeg'      
    // }

    if (post.data.author) {
      posts[i].author = await getEntry(post.data.author)
    }
    else {
      posts[i].author = defaultauthor
    }

    // posts[i].categories = categoriesdetail.map(category => category.data.title)
  }

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
      <title><![CDATA[${post.data.title}]]></title>
      <link>${new URL(
        '/post/' + post.slug,
        import.meta.env.SITE
      ).toString()}</link>
      <author>${post.author.data.title}</author>
      <description><![CDATA[${post.data.description}]]></description>
      <pubDate>${post.data.date}</pubDate>
      <guid>${new URL(post.slug, import.meta.env.SITE).toString()}</guid>
${post.data.categories.map(category => '      <category>' + category + '</category>').join('\n')}
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`
  }
}
// <media:content URL="${new URL(
//   post.data.image.src,
//   import.meta.env.SITE
// ).toString()}" type="image/jpeg" medium="image" height="${
// post.data.image.height
// }" width="${post.data.image.width}"/>
