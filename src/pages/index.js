import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import HomePage from '../../components/HomePage';
import { SITE_NAME, SITE_URL } from '../../lib/seo';
import {
  getQuestions,
  getLeetCodeQuestions,
  getAllBlogPosts,
} from '../../lib/db';

export default function Home({ stats, recent }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Developer learning hub with NamasteDev questions, blogs and LeetCode solutions.',
  };

  return (
    <>
      <Seo path="/" jsonLd={jsonLd} />
      <Layout count={stats.total}>
        <HomePage stats={stats} recent={recent} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  let questions = [];
  let leetcode = [];
  let blogs = [];
  try {
    [questions, leetcode, blogs] = await Promise.all([
      getQuestions(),
      getLeetCodeQuestions(),
      getAllBlogPosts(),
    ]);
  } catch (err) {
    console.error('Home data load failed:', err);
  }

  const stats = {
    namastedev: questions.length,
    leetcode: leetcode.length,
    blog: blogs.length,
    total: questions.length + leetcode.length,
  };

  // Interleave a few problems from each track as "recently added".
  const recent = [];
  const maxLen = Math.max(questions.length, leetcode.length);
  for (let i = 0; i < maxLen && recent.length < 6; i++) {
    if (questions[i]) {
      recent.push({
        section: 'namastedev',
        title: questions[i].title,
        href: questions[i].link || `/namastedev/${questions[i].id}`,
        difficulty: questions[i].category?.[0] || null,
      });
    }
    if (leetcode[i] && recent.length < 6) {
      recent.push({
        section: 'leetcode',
        title: leetcode[i].problemNo
          ? `${leetcode[i].problemNo} ${leetcode[i].title}`
          : leetcode[i].title,
        href: leetcode[i].link || `/leetcode/${leetcode[i].id}`,
        difficulty: leetcode[i].category?.[0] || null,
      });
    }
  }

  return {
    props: { stats, recent },
    revalidate: 300,
  };
}
