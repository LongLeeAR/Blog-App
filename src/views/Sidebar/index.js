import { Link, useNavigate } from 'react-router-dom';
import { BLOG_TYPE, BLOG_TYPE_NAME_MAP } from 'shared/constants';
import './index.css';

const SidebarLink = ({toggleSidebar, ...rest}) => {
  return (
    <Link className='sidebar-link' {...rest} onClick={() => {toggleSidebar(false)}} />
  )
}

const Sidebar = ({isOpen, toggleSidebar}) => {
  const navigate = useNavigate();

  const closeSidebar = (callback) => {
    callback();
    toggleSidebar(false);
  }

  return (
    <div className='sidebar-container'>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h3
          onClick={() => {
            closeSidebar(() => navigate('tap-but'));
          }}
          className="brand-item"
        >
          LongHaiLe.com
        </h3>
        <section className='sidebar-list'>
          <SidebarLink toggleSidebar={toggleSidebar} to="/tap-but">
            <img
              className="big-emoji"
              alt="✍🏼"
              src="https://s.w.org/images/core/emoji/14.0.0/svg/270d-1f3fc.svg"
            />
            Tạp bút
          </SidebarLink>
          <ul className=''>
            {
              Object.values(BLOG_TYPE).map(type => {
                return (<li key={type}>
                  <SidebarLink toggleSidebar={toggleSidebar} className={`link`} to={`tap-but/${type}`}>{BLOG_TYPE_NAME_MAP[type]}</SidebarLink>
                </li>)
              })
            }
          </ul>
          <SidebarLink toggleSidebar={toggleSidebar} to="/photos">
            <img draggable="false" className="emoji" alt="📷" src="https://s.w.org/images/core/emoji/14.0.0/svg/1f4f7.svg" />
            Photos
          </SidebarLink>
          <SidebarLink toggleSidebar={toggleSidebar} to="/gioi-thieu">
            <i className="fa fa-user user-icon"></i>
            Giới thiệu
          </SidebarLink>
        </section>
      </div>
    {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
