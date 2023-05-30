import React, { useEffect, useRef, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from 'shared/components/Toast';
import { BLOG_TYPE, BLOG_TYPE_NAME_MAP, OWNER_EMAIL } from 'shared/constants';

import { EDITOR_JS_TOOLS } from 'shared/constants';
import { useActions } from 'shared/redux/useActions';
import { v4 as uuid } from 'uuid';
import { useFirebaseContext } from 'views/FirebaseProvider';
import { selectBlogById, selectIsFetchingBlogDetail, selectIsSaveBlogSuccess } from '../Blogs.selectors';
import { blogsActions } from '../Blogs.slice';
import './index.css';


const ReactEditorJS = createReactEditorJS();

const BlogEditor = (props) => {
  const {blogId, blogType} = useParams();
  const navigate = useNavigate();
  const {user, app} = useFirebaseContext();
  const editorRef = useRef();
  const blogDetail = useSelector(state => selectBlogById(state, blogId));
  const isSaveBlogSuccess = useSelector(selectIsSaveBlogSuccess);
  const isFetchingBlogDetail = useSelector(selectIsFetchingBlogDetail);
  const [selectedBlogType, setSelectedBlogType] = useState(blogType || BLOG_TYPE.Chronicle);
  const showToast = useToast();
 
  const {saveBlog, resetFlag, fetchBlogDetail} = useActions({
    fetchBlogDetail: blogsActions.fetchBlogDetail,
    saveBlog: blogsActions.saveBlog,
    resetFlag: blogsActions.resetFlag,
  })

  const onInitEditor = (editorCore) => {
    editorRef.current = editorCore;
  }

  useEffect(() => {
    if (blogId && !blogDetail) {
      fetchBlogDetail(blogId);
    }
  }, [blogDetail])

  useEffect(() => {
    if (isSaveBlogSuccess) {
      showToast({
        type: 'success',
        message: 'Save blog successfully!'
      });
      resetFlag();
      navigate(-1)
    }
  }, [isSaveBlogSuccess])

  const onReady = () => {
    if (editorRef?.current && blogDetail) {
      const {id, type, ...rest} = blogDetail;
      setSelectedBlogType(type);
      editorRef.current.render({...rest});
    }
  }

  const handleSaveBlog = async () => {
    if (user?.email !== OWNER_EMAIL) {
      return;
    }
    const savedData = await editorRef?.current?.save();
    let id = blogDetail ? blogDetail.id : uuid();
    const dataToSave = {
      ...savedData,
      id,
      type: selectedBlogType
    };
    
    if (blogDetail) {
      dataToSave.time = blogDetail.time;
      dataToSave.updated = savedData.time;
    }

    saveBlog({
      blog: dataToSave,
      app
    })
  }

  const goBack = () => {
    resetFlag();
    navigate(-1);
  }

  return (<>
    <section className='editor-container'>
      <section className='editor-action'>
        <section>
          <ul className="menu">
            <li
              className="menuItem dropdown-item"
            >
              <div className='blog-type-dropdown'>{BLOG_TYPE_NAME_MAP[selectedBlogType]} <i style={{marginLeft: 8}} className="fa fa-chevron-down"></i></div>
              {
                !Boolean(blogType) &&
                <ul
                  role="menu"
                  className="dropdown-menu"
                >
                  {
                    Object.values(BLOG_TYPE).map(type => {
                      return (<li key={type}>
                        <div onClick={() => {setSelectedBlogType(type)}} className='blog-type-option'>{BLOG_TYPE_NAME_MAP[type]}</div>
                      </li>)
                    })
                  }
                </ul>
              }
            </li>
          </ul>
        </section>
        <section>
          <button onClick={goBack} className='secondary'>Cancel</button>
          <button onClick={handleSaveBlog} className='primary'>Save</button>
        </section>
      </section>
      {
        !isFetchingBlogDetail && 
        <ReactEditorJS
          tools={EDITOR_JS_TOOLS}
          inlineToolbar
          onInitialize={onInitEditor}
          holder="blog-editor"
          placeholder="Viết gì đó đi!"
          minHeight={500}
          width={"90%"}
          onReady={onReady}
          defaultValue={{
            blocks: [
              {
                id: "default-header",
                type: "header",
                data: {
                  text: "Tiêu đề",
                  level: 1,
                }
              }
            ]
          }}
        />
      }
    </section>
  </>)
}

export default React.memo(BlogEditor);
