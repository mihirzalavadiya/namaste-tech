import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getAllBlogPosts } from '../lib/db';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs } from '@/redux/slice/blogsSlice';

const BlogPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const allblogs = useSelector((state) => state.allBlogs.blogs);

  useEffect(() => {
    if (allblogs.length > 0) {
      setBlogData(allblogs);
      setLoading(false);
      return;
    }
    getAllBlogPosts().then((data) => {
      setBlogData(data);
      dispatch(setBlogs(data));
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader fullScreen={true} size="medium" />;

  return (
    <>
      <div className="blog-container">
        <div className="blog-section-header">
          <h1 className="blog-section-title">Blogs</h1>
        </div>

        <Card projects={blogData} isBlog={true} />
      </div>
    </>
  );
};

export default BlogPage;
