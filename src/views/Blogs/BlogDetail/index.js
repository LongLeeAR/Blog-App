import React, { useRef } from 'react';
import { createReactEditorJS } from "react-editor-js";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "shared/components";
import { BLOG_TYPE_NAME_MAP, EDITOR_JS_TOOLS } from "shared/constants";
import { separateTheBlogHeader } from 'shared/utils/removeBlogHeader';
import { useFirebaseContext } from "views/FirebaseProvider";
import { selectBlogById } from '../Blogs.selectors';
import BlogsRightSection from "../BlogsRightSection";

const ReactEditorJS = createReactEditorJS();

const BlogDetail = () => {
  const {blogId} = useParams();
  const {user} = useFirebaseContext();
  const navigate = useNavigate();
  const editorRef = useRef();
  // const {fetchBlogDetail} = useActions({
  //   fetchBlogDetail: blogDetailActions.fetchBlogDetail,
  // })
  const blogDetail = useSelector(state => selectBlogById(state, blogId));

  const formattedData = separateTheBlogHeader(blogDetail);

  // useEffect(() => {
  //   // if (blogId) {
  //   fetchBlogDetail(blogId);
  //   // }
  // }, [])

  const onInitEditor = (editorCore) => {
    editorRef.current = editorCore;
  }

  const onEditorReady = () => {
    if (formattedData?.blog) {
      editorRef?.current?.render(formattedData.blog);
    }
  }

  const editBlog = (id) => {
    navigate(`/chinh-sua/${id}`);
  }

  return (
    <Layout
      isBlogDetail
      rightContent={<BlogsRightSection />}
    >
      {
        <section style={{marginTop: 16}}>
          {
            formattedData?.blog &&
            <>
              <h2>{formattedData.headerBlock?.data?.text}</h2>
              <section className='sub-title'>
                <span className='blog-type'>{BLOG_TYPE_NAME_MAP[formattedData.blog.type]}</span>
                <span>{new Date(formattedData.blog.time).toLocaleDateString()}</span>
                {
                  Boolean(user) && <i className="fa fa-pencil" style={{marginLeft: 8, cursor: 'pointer'}} onClick={() => {editBlog(formattedData.blog.id)}}></i>
                }
              </section>
              <ReactEditorJS
                readOnly
                onInitialize={onInitEditor}
                tools={EDITOR_JS_TOOLS}
                onReady={onEditorReady}
                holder="blog-reader"
              />
            </>
          }
        </section>
      }
    </Layout>
  )
}

export default React.memo(BlogDetail);
