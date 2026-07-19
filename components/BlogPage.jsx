import React from 'react';
import SectionListing from './SectionListing';

const BlogPage = ({ blogs = [] }) => (
  <SectionListing sectionKey="blog" items={blogs} />
);

export default BlogPage;
