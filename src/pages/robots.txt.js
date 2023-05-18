export async function get() {
  return {
    body: `User-agent: *
Allow: /
Sitemap: ${import.meta.env.SITE}${import.meta.env.BASE_URL}sitemap-index.xml
`
  }
}
