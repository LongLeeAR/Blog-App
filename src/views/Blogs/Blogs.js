import { getDatabase, onValue, ref, order, query } from 'firebase/database';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Layout } from 'shared/components';
import { useLoadingSpinContext } from 'shared/components/LoadingSpinner';
import { BLOGS_INTRODUCTION, BLOG_TYPE_NAME_MAP, DEFAULT_BLOG_TITLE, INTRODUCTION_BLOG_TYPE_MAP } from 'shared/constants';
import { formatText } from 'shared/utils/formatText';
import { separateTheBlogHeader } from 'shared/utils/removeBlogHeader';
import { useFirebaseContext } from 'views/FirebaseProvider';
import BlogDetail from './BlogDetail';
import { EDITOR_JS_TOOLS } from './BlogEditor/constants';
import { BlogList } from './BlogList';
import './Blogs.css';
import BlogsRightSection from './BlogsRightSection';



const Blogs = () => {
  const {blogId}  = useParams();
  if (blogId) {
    return <BlogDetail />
  } else {
    return <BlogList />
  }
}

export default React.memo(Blogs);