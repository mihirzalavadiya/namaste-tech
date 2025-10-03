import Head from 'next/head';
import Layout from '../../components/Layout';
import HomePage from '../../components/HomePage';

export default function Home() {
  return (
    <>
      <Head>
        <title>NamasteTech</title>
        <meta
          name="description"
          content="NamasteTech is a developer learning hub featuring NamasteDev questions and answers, in-depth articles, blogs, and resources to help you grow as a modern web developer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <HomePage />
      </Layout>
    </>
  );
}
