import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BLOG_TYPE, BLOG_TYPE_NAME_MAP } from "shared/constants";
import { useLogin } from "shared/hooks/useLogin";
import { useActions } from "shared/redux/useActions";
import styled from "styled-components";
import { selectUser } from 'views/Login/Auth.selectors';
import { authActions } from "views/Login/Auth.slice";
import './index.css';

const StickyHeader = styled.div`
  height: 50px;
  width: 100%;
  top: 0;
  z-index: 1;
  background: #fff;
  position: sticky;
  border-bottom: solid 1px #eee;
  display: flex;
  justify-content: center;
`
const MenuWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  display: block;
  color: #555;
  padding-left: 16%;
`

const TopNavBar = () => {

  const navigate = useNavigate();
  const login = useLogin();
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

  return (
    <StickyHeader>
      <MenuWrapper>
        <ul className="menu">
          <li onClick={() => navigate('tap-but')} className="menuItem brand-item" >LongHaiLe.com</li>
          <li
            className="menuItem dropdown-item"
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
          <li className="menuItem" >
            <Link className="link" to="/photos">
              <img draggable="false" className="emoji" alt="📷" src="https://s.w.org/images/core/emoji/14.0.0/svg/1f4f7.svg" />
              Photos
            </Link>
          </li>
          <li className="menuItem">
            <Link className="link" to="/gioi-thieu">
              <i className="fa fa-user user-icon"></i>
              Giới thiệu
            </Link>
          </li>
        </ul>
      </MenuWrapper>
      <section style={{alignSelf: 'center', marginRight: 16, cursor: 'pointer', minWidth: 170, display: 'flex', justifyContent: 'flex-end'}}>
        {
           Boolean(user) ?  <ul className="menu">
            <li className="menuItem dropdown-item">
              <h4 >{user?.displayName}</h4>
              <img src={user?.photoURL} width="24px" height="24px" style={{borderRadius: '50%', marginLeft: 8}} />
              <ul
                role="menu"
                style={{width: 100}}
                className="dropdown-menu"
              >
                <li onClick={logout} className="link">Logout</li>
              </ul>
            </li>
           </ul> 
           : <section style={{cursor: 'pointer', display: 'flex', justifyContent: 'flex-end'}} onClick={login}>Login</section>
        }
      </section>
    </StickyHeader>
  )
}

export default TopNavBar;