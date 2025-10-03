import React from 'react';
import Card from './Card';
import projects from '../src/utils/blogsDetails.json';

const BlogPage = () => {
  return (
    <>
      <div className="blog-container">
        <div className="blog-section-header">
          <h1 className="blog-section-title">Blogs</h1>
        </div>

        <Card projects={projects} />
      </div>
    </>
  );
};

export default BlogPage;
