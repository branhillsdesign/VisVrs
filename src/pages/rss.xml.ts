import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function get() {
  let posts = await getCollection('posts')

  posts.sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());

  posts = posts.slice(0, 3)

  return rss({
    title: 'BranHills.com - Blog',
    description: 'Personal website and portfolio of Brandon Hills, Staff Product Designer at BizLibrary.com',
    site: 'https://www.branhills.com/',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `${post.slug}/`
    })),
    customData: `<language>en</language>`
  })
}
