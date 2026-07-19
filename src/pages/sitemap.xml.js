import { getQuestions, getLeetCodeQuestions } from '../../lib/db';
import { SITE_URL, absoluteUrl } from '../../lib/seo';

function buildSitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
  )
  .join('\n')}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const urls = [
    { loc: SITE_URL, changefreq: 'weekly', priority: '1.0' },
    { loc: absoluteUrl('/namastedev'), changefreq: 'weekly', priority: '0.8' },
    { loc: absoluteUrl('/blog'), changefreq: 'weekly', priority: '0.8' },
    { loc: absoluteUrl('/leetcode'), changefreq: 'weekly', priority: '0.8' },
  ];

  try {
    const [questions, leetcode] = await Promise.all([
      getQuestions(),
      getLeetCodeQuestions(),
    ]);

    questions.forEach((q) =>
      urls.push({
        loc: absoluteUrl(`/namastedev/${q.id}`),
        changefreq: 'monthly',
        priority: '0.6',
      })
    );
    leetcode.forEach((q) =>
      urls.push({
        loc: absoluteUrl(`/leetcode/${q.id}`),
        changefreq: 'monthly',
        priority: '0.6',
      })
    );
  } catch (err) {
    console.error('sitemap generation failed:', err);
  }

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );
  res.write(buildSitemap(urls));
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
