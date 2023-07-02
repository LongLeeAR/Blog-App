import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BLOG_TYPE, BLOG_TYPE_NAME_MAP } from "shared/constants";
import { useLogin } from "shared/hooks/useLogin";
import { useActions } from "shared/redux/useActions";
import { selectUser } from 'views/Login/Auth.selectors';
import { authActions } from "views/Login/Auth.slice";
import Sidebar from 'views/Sidebar';
import './index.css';


const TopNavBar = () => {
  const navigate = useNavigate();
  const login = useLogin();
  const [isOpenSidebar, toggleSidebar] = useState(false);
  const {logout, setLoginInfo} = useActions({
    logout: authActions.logout,
    setLoginInfo: authActions.setLoginInfo
  })

  const user = useSelector(selectUser);

  useEffect(() => {
    const loginInfo = localStorage.getItem('user');
    if (loginInfo && loginInfo !== '{}') {
      setLoginInfo(loginInfo);
    }
  }, [])

  const onToggleSidebar = () => {
    toggleSidebar(e => !e);
  }

  return (
   <>
     <Sidebar isOpen={isOpenSidebar} toggleSidebar={onToggleSidebar} />
     <div className='header'>
      <div className='left-header'>
        <ul className="menu top-menu">
          <li className="menuItem small-screen-only">
            <i onClick={onToggleSidebar} className="fa fa-bars"></i>
          </li>
          <li onClick={() => navigate('tap-but')} className="menuItem brand-item" >LongHaiLe.com</li>
          <li
            className="top-only-item menuItem dropdown-item"
          >
            <Link className="link" to="/tap-but">
              <img
                className="emoji"
                alt="✍🏼"
                src="https://s.w.org/images/core/emoji/14.0.0/svg/270d-1f3fc.svg"
              />
              Tạp bút
            </Link>
            <ul
              role="menu"
              className="dropdown-menu"
            >
              {
                Object.values(BLOG_TYPE).map(type => {
                  return (<li key={type}>
                    <Link className="link" to={`/tap-but/${type}`}>{BLOG_TYPE_NAME_MAP[type]}</Link>
                  </li>)
                })
              }
            </ul>
          </li>
          <li className="menuItem top-only-item" >
            <Link className="link" to="/photos">
              <img draggable="false" className="emoji" alt="📷" src="https://s.w.org/images/core/emoji/14.0.0/svg/1f4f7.svg" />
              Photos
            </Link>
          </li>
          <li className="menuItem top-only-item">
            <Link className="link" to="/gioi-thieu">
              <i className="fa fa-user user-icon"></i>
              Giới thiệu
            </Link>
          </li>
        </ul>
      </div>
      <section className='right-header'>
        {
           Boolean(user) ?  <ul className="menu">
            <li className="menuItem dropdown-item">
              <h4 className='user-name'>{user?.displayName}</h4>
              <img src={user?.photoURL} width="24px" height="24px" style={{borderRadius: '50%'}} />
              <ul
                role="menu"
                style={{width: 100}}
                className="dropdown-menu "
              >
                <li onClick={logout} className="link">Logout</li>
              </ul>
            </li>
           </ul> 
           : <section style={{cursor: 'pointer', display: 'flex', justifyContent: 'flex-end'}} onClick={login}>Login</section>
        }
      </section>
    </div>
   </>
  )
}

export default TopNavBar;