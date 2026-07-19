import React from 'react';
import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import LeetCode from '../../components/LeetCode';
import { getLeetCodeQuestions } from '../../lib/db';

const LeetCodePage = ({ questions }) => {
  return (
    <>
      <Seo
        title="LeetCode Solutions"
        description="Clean JavaScript solutions to a wide range of LeetCode problems, grouped by difficulty."
        path="/leetcode"
      />
      <Layout count={questions.length}>
        <LeetCode questions={questions} />
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  let questions = [];
  try {
    questions = await getLeetCodeQuestions();
  } catch (err) {
    console.error('Failed to load LeetCode questions:', err);
  }

  return {
    props: { questions },
    revalidate: 300,
  };
}

export default LeetCodePage;
