import Seo from '../../../components/Seo';
import Layout from '../../../components/Layout';
import ProblemDetail from '../../../components/ProblemDetail';
import { getQuestions, getQuestionDetailsById } from '../../../lib/db';

export default function NamasteDevDetailPage({
  summary,
  detail,
  nextItem,
  count,
}) {
  const description =
    detail?.problem?.replace(/\s+/g, ' ').trim().slice(0, 155) ||
    `NamasteDev solution for ${summary?.title}.`;

  return (
    <>
      <Seo
        title={summary?.title}
        description={description}
        path={`/namastedev/${summary?.id}`}
        type="article"
        image={summary?.image || undefined}
      />
      <Layout count={count}>
        <ProblemDetail
          summary={summary}
          detail={detail}
          sectionKey="namastedev"
          nextItem={nextItem}
        />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  let paths = [];
  try {
    const questions = await getQuestions();
    paths = questions.map((q) => ({ params: { id: String(q.id) } }));
  } catch (err) {
    console.error('getStaticPaths (namastedev) failed:', err);
  }

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const [questions, detail] = await Promise.all([
      getQuestions(),
      getQuestionDetailsById(params.id),
    ]);

    const idx = questions.findIndex((q) => String(q.id) === String(params.id));
    if (idx === -1) return { notFound: true, revalidate: 60 };

    const summary = questions[idx];
    const next = questions[idx + 1];
    const nextItem = next
      ? { title: next.title, href: next.link || `/namastedev/${next.id}` }
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
    console.error('getStaticProps (namastedev) failed:', err);
    return { notFound: true, revalidate: 60 };
  }
}
