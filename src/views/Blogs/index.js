import React from 'react';
import { useParams } from 'react-router-dom';
import BlogDetail from './BlogDetail';
import { BlogList } from './Blogs';
import './index.css';

const Blogs = () => {
  const {blogId}  = useParams();
  if (blogId) {
    return <BlogDetail />
  } else {
    return <BlogList />
  }
}

export default React.memo(Blogs);