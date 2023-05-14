import { getDatabase, onValue, ref, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as storageRef, uploadString } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { useNavigate, useParams } from "react-router-dom";
import { useLoadingSpinContext } from "shared/components/LoadingSpinner";
import { BLOG_TYPE, BLOG_TYPE_NAME_MAP } from 'shared/constants';
import { formatText } from "shared/utils/formatText";
import { v4 as uuid } from 'uuid';
import { useFirebaseContext } from 'views/FirebaseProvider';
import './BlogEditor.css';
import { EDITOR_JS_TOOLS } from './constants';


const ReactEditorJS = createReactEditorJS();

const BlogEditor = (props) => {
  const {blogId, blogType} = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const {user, app} = useFirebaseContext();
  const db = getDatabase();
  const [currentBlog, setCurrentBlog] = useState();
  const {setLoading} = useLoadingSpinContext();
  const storage = getStorage(app);
  // const location = useLocation();
  // const prevLocation= useRef(location);
  // const {} = useHistory()

  const editorRef = useRef();
  const [selectedBlogType, setSelectedBlogType] = useState(blogType || BLOG_TYPE.Chronicle);

  const handleOnSubmit = (value) => {
    if (value === 'abc' && user?.email === 'longhaile.ar@gmail.com') {
      setIsOpen(false);
    }
  }

  // useEffect(() => {
  //   if (prevLocation.current.pathname !== location.pathname) {
  //     const answer = window.confirm('Are you sure want to leave?');

  //     if (!answer) {
        
  //     }
  //   }
  //   prevLocation.current = location;
  // }, [location])

  useEffect(() => {
    window.onbeforeunload = () => {
      // setIsOpen(false);
      return true;
    }
  }, [])

  const onInitEditor = (editorCore) => {
    editorRef.current = editorCore;
  }

  const onReady = () => {
    if (blogId) {
      onValue(ref(db, 'blogs/tap-but/' + blogId), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setCurrentBlog(data);
          const {id, type, ...rest} = data;
          setSelectedBlogType(type);
          editorRef?.current && editorRef.current.render({...rest});
        }
      })
    }
  }

  const handleSaveBlog = async () => {
    setLoading(true);
    const savedData = await editorRef?.current?.save();
    const imagesRef = storageRef(storage, 'images');
    const imagesBlock = savedData.blocks.filter(block => block.type === 'simpleImage' && block?.data?.url?.startsWith('data:image/'));
    for (const imageBlock of imagesBlock) {
      const snapshot = await uploadString(storageRef(imagesRef, Date.now().toString()), imageBlock.data.url, 'data_url');
      const url = await getDownloadURL(storageRef(storage, snapshot.metadata.fullPath));
      imageBlock.data.url = url;
    }
    const imageBlocksById = imagesBlock.reduce((acc, block) => {
      return {
        ...acc,
        [block.id]: block
      }
    }, {})
    savedData.blocks = savedData.blocks.map(block => {
      if (block?.data?.text) {
        block.data.text = formatText(block?.data?.text);
      }
      if (imageBlocksById[block.id]) {
        return imageBlocksById[block.id];
      }
      return block;
    })
    let id = currentBlog ? currentBlog.id : uuid();
    const dataToSave = {
      ...savedData,
      id,
      type: selectedBlogType
    };
    if (currentBlog) {
      dataToSave.time = currentBlog.time;
      dataToSave.updated = savedData.time;
    }
    await set(ref(db, 'blogs/tap-but/' + id), dataToSave);
    navigate(-1)
    setLoading(false)
  }

  const goBack = () => {
    navigate(-1);
  }
  

  return <>
    {/* <Modal isOpen={isOpen}>
      <ModalContent
        title="Nội dung giới hạn!"
        subTitle="Nhập mật khẩu"
        onSubmit={handleOnSubmit}
      />
    </Modal> */}
    {
    // !isOpen &&

    
      <section className='editor-container'>
        <section className='editor-action'>
          <section>
            <ul className="menu">
              <li
                className="menuItem dropdown-item"
              >
                <div className='blog-type-dropdown'>{BLOG_TYPE_NAME_MAP[selectedBlogType]} <i style={{marginLeft: 8}} className="fa fa-chevron-down"></i></div>
                {
                  !Boolean(blogType) && <ul
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
        <section>
          
        </section>
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
        
      </section>
    }
  </>
}

export default React.memo(BlogEditor);
