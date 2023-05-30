import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from 'shared/components';
import { BLOGS_INTRODUCTION, BLOG_TYPE, BLOG_TYPE_NAME_MAP, DEFAULT_BLOG_TITLE, INTRODUCTION_BLOG_TYPE_MAP } from 'shared/constants';
import { useActions } from 'shared/redux/useActions';
import { formatText } from 'shared/utils/formatText';
import { useFirebaseContext } from 'views/FirebaseProvider';
import './Blogs.css';
import { selectBlogs } from './Blogs.selectors';
import { blogsActions } from './Blogs.slice';
import BlogsRightSection from './BlogsRightSection';


export const BlogList = () => {
  const {blogRouteType}  = useParams();
  const navigate = useNavigate();
  const {user} = useFirebaseContext();
  const {data: blogsById} = useSelector(selectBlogs);

  const blogs = useMemo(() => {
    if (!blogsById) {
      return [];
    }
    
    return Object.values(blogsById).sort((a, b) => b.time - a.time);
  }, [blogsById])

  const {fetchBlogs} = useActions({
    fetchBlogs: blogsActions.fetchBlogs
  })

  useEffect(() => {
    fetchBlogs();
  }, [])
  
  const blogsFiltered = useMemo(() => {
    if (!blogRouteType) {
      // filter the blogs exclude the BLOG_TYPE.JobExperience
      return blogs.filter(blog => {
        const {type} = blog;
        return type !== BLOG_TYPE.JobExperience;
      })
    }

    return blogs.filter(blog => {
      const {type} = blog;

      return type === blogRouteType;
    })
  }, [blogRouteType, blogs]);

  const introduction = useMemo(() => INTRODUCTION_BLOG_TYPE_MAP[blogRouteType] ?? BLOGS_INTRODUCTION, [blogRouteType])

  const title = useMemo(() => BLOG_TYPE_NAME_MAP[blogRouteType] ?? DEFAULT_BLOG_TITLE, [blogRouteType]);

  const editBlog = (id) => {
    navigate(`/chinh-sua/${id}`);
  }

  const openBlog = (type, id) => {
    navigate(`/tap-but/${type}/${id}`);
  }

  return (
    <Layout
      title={title}
      imgUrl="https://s.w.org/images/core/emoji/14.0.0/svg/270d-1f3fc.svg"
      introduction={introduction}
      rightContent={<BlogsRightSection />}
    >
      <section className='blogs'>
        {
          blogsFiltered?.length > 0 && blogsFiltered.map(({id, time, type, blocks}) => {
            const title = blocks[0]?.data?.text;
            const firstImageBlock = blocks.find(block => block.type === 'simpleImage');
            const firstParagraphBlock = blocks.find(block => block.type === 'paragraph');
            
            return (
              <section key={id} className='blog-preview'>
                <h2>{title}</h2>
                <section className='sub-title'>
                  <span className='blog-type'>{BLOG_TYPE_NAME_MAP[type]}</span>
                  <span>{new Date(time).toLocaleDateString()}</span>
                  {
                    Boolean(user) && <i className="fa fa-pencil" style={{marginLeft: 8, cursor: 'pointer'}} onClick={() => {editBlog(id)}}></i>
                  }
                </section>
                {
                  firstImageBlock &&  <section className='blog-cover-image'>
                    <img src={firstImageBlock?.data?.url} alt={title}/>
                  </section>
                }
                <section className='blog-content-preview'>
                  <p className='blog-text'>{formatText(firstParagraphBlock?.data?.text)}...</p>
                </section>
                <div className='continue-reading-button'>
                  <button onClick={() => openBlog(type, id)}>Đọc tiếp</button>
                </div>
              </section>
            )
          })
        }
      </section>
    </Layout>
  )
}