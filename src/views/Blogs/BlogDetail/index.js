import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useRef, useState } from 'react';
import { createReactEditorJS } from "react-editor-js";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "shared/components";
import { useLoadingSpinContext } from "shared/components/LoadingSpinner";
import { BLOG_TYPE_NAME_MAP } from "shared/constants";
import { separateTheBlogHeader } from "shared/utils/removeBlogHeader";
import { useFirebaseContext } from "views/FirebaseProvider";
import { EDITOR_JS_TOOLS } from "../BlogEditor/constants";
import BlogsRightSection from "../BlogsRightSection";

const ReactEditorJS = createReactEditorJS();

const BlogDetail = () => {
  const {blogId} = useParams();
  const db = getDatabase();
  const [selectedBlog, setSelectedBlog] = useState();
  const {user} = useFirebaseContext();
  const navigate = useNavigate();
  const editorRef = useRef();
  const {setLoading} = useLoadingSpinContext();

  useEffect(() => {
    if (blogId) {
      const blogRef = ref(db, `/blogs/tap-but/${blogId}`);
      onValue(blogRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const selected = separateTheBlogHeader(data);
          console.log('selected: ', selected);
          setSelectedBlog(selected);
          // editorRef?.current?.render(selected.blog);
        }
        // console.log('hide the loading');
        // setLoading(false)
      });
    }
  }, [])


  const onInitEditor = (editorCore) => {
    setLoading(true);
    console.log('show loading on blog detail');
    editorRef.current = editorCore;
  }

  const onEditorReady = () => {
    if (blogId) {
      selectedBlog && editorRef?.current?.render(selectedBlog.blog);
    console.log('hide loading on blog detail');

      setLoading(false)
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
            Boolean(blogId) && selectedBlog?.blog &&
            <>
              <h2>{selectedBlog.headerBlock?.data?.text}</h2>
              <section className='sub-title'>
                <span className='blog-type'>{BLOG_TYPE_NAME_MAP[selectedBlog.blog.type]}</span>
                <span>{new Date(selectedBlog.blog.time).toLocaleDateString()}</span>
                {
                  Boolean(user) && <i className="fa fa-pencil" style={{marginLeft: 8, cursor: 'pointer'}} onClick={() => {editBlog(selectedBlog.blog.id)}}></i>
                }
              </section>
              <ReactEditorJS
                readOnly
                // key={blogId}
                onInitialize={onInitEditor}
                tools={EDITOR_JS_TOOLS}
                onReady={onEditorReady}
                holder="blog-reader"
                // value={selectedBlog.blog}
              />
            </>
          }
          {/* {
            Boolean(blogId) &&
            
          } */}
        </section>
      }
    </Layout>
  )
}

export default React.memo(BlogDetail);
