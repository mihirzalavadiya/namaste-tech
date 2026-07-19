import React from 'react';
import Seo from '../../components/Seo';
import NamasteDev from '../../components/NamasteDev';
import Layout from '../../components/Layout';
import { getQuestions } from '../../lib/db';

const NamasteDevPage = ({ questions }) => {
  return (
    <>
      <Seo
        title="NamasteDev Questions"
        description="Solutions to all NamasteDev machine-coding problems with every test case passed — React and JavaScript challenges asked by top companies."
        path="/namastedev"
      />
      <Layout count={questions.length}>
        <NamasteDev questions={questions} />
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  let questions = [];
  try {
    questions = await getQuestions();
  } catch (err) {
    console.error('Failed to load NamasteDev questions:', err);
  }

  return {
    props: { questions },
    revalidate: 300, // ISR: refresh at most every 5 minutes
  };
}

export default NamasteDevPage;
