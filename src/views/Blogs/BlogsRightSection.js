import { Link, useParams } from 'react-router-dom';
import { BLOG_TYPE, BLOG_TYPE_NAME_MAP } from 'shared/constants';
import './BlogsRightSection.css';

const BlogsRightSection = () => {
  const {blogRouteType} = useParams();

  return (
    <section className='list-item'>
      <h3>
        <img
          className="big-emoji"
          alt="✍🏼"
          src="https://s.w.org/images/core/emoji/14.0.0/svg/270d-1f3fc.svg"
        />
        Tạp bút
      </h3>
      <ul className='right-content-list-item'>
        {
          Object.values(BLOG_TYPE).map(type => {
            return (<li key={type}>
              <Link className={`link ${blogRouteType === type ? 'selected' : ''}`} to={type}>{BLOG_TYPE_NAME_MAP[type]}</Link>
            </li>)
          })
        }
      </ul>
    </section>
  )
}

export default BlogsRightSection;
