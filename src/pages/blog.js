import React from 'react';
import Seo from '../../components/Seo';
import BlogPage from '../../components/BlogPage';
import Layout from '../../components/Layout';
import { getAllBlogPosts } from '../../lib/db';

const BlogRoute = ({ blogs }) => {
  return (
    <>
      <Seo
        title="Blogs"
        description="In-depth articles and blog posts on web development, React, JavaScript and modern programming."
        path="/blog"
      />
      <Layout count={blogs.length}>
        <BlogPage blogs={blogs} />
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  let blogs = [];
  try {
    blogs = await getAllBlogPosts();
  } catch (err) {
    console.error('Failed to load blogs:', err);
  }

  return {
    props: { blogs },
    revalidate: 300,
  };
}

export default BlogRoute;
