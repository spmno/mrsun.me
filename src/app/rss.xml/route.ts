import { getAllPostsMeta } from '@/lib/posts';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPostsMeta();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/posts/${post.year}/${post.month}/${post.slug}/`;
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      ${post.tags.map((t) => `<category>${t}</category>`).join('\n      ')}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.title}]]></title>
    <link>${siteConfig.url}</link>
    <description><![CDATA[${siteConfig.description}]]></description>
    <language>${siteConfig.locale}</language>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  });
}
