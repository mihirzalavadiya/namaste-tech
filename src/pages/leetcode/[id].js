import Seo from '../../../components/Seo';
import Layout from '../../../components/Layout';
import ProblemDetail from '../../../components/ProblemDetail';
import {
  getLeetCodeQuestions,
  getLeetCodeQuestionDetailsById,
} from '../../../lib/db';

export default function LeetCodeDetailPage({
  summary,
  detail,
  nextItem,
  count,
}) {
  const description =
    detail?.problem?.replace(/\s+/g, ' ').trim().slice(0, 155) ||
    `LeetCode solution for ${summary?.title}.`;

  return (
    <>
      <Seo
        title={summary?.title}
        description={description}
        path={`/leetcode/${summary?.id}`}
        type="article"
        image={summary?.image || undefined}
      />
      <Layout count={count}>
        <ProblemDetail
          summary={summary}
          detail={detail}
          sectionKey="leetcode"
          nextItem={nextItem}
        />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  let paths = [];
  try {
    const questions = await getLeetCodeQuestions();
    paths = questions.map((q) => ({ params: { id: String(q.id) } }));
  } catch (err) {
    console.error('getStaticPaths (leetcode) failed:', err);
  }

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const [questions, detail] = await Promise.all([
      getLeetCodeQuestions(),
      getLeetCodeQuestionDetailsById(params.id),
    ]);

    const idx = questions.findIndex((q) => String(q.id) === String(params.id));
    if (idx === -1) return { notFound: true, revalidate: 60 };

    const summary = questions[idx];
    const next = questions[idx + 1];
    const nextItem = next
      ? { title: next.title, href: next.link || `/leetcode/${next.id}` }
      : null;

    return {
      props: {
        summary,
        detail: detail || null,
        nextItem,
        count: questions.length,
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error('getStaticProps (leetcode) failed:', err);
    return { notFound: true, revalidate: 60 };
  }
}
