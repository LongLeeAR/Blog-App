import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { BLOG_TYPE, BLOG_TYPE_NAME_MAP } from "shared/constants";
import styled from "styled-components";
import { useFirebaseContext } from "views/FirebaseProvider";
import './TopNavBar.css';

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
  const {user, setUser, setToken} = useFirebaseContext();
  const navigate = useNavigate();

  const openLoginPopup = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      setToken(token);
      // The signed-in user info.
      const {displayName, email} = result.user;
      // console.log('user: ', user);
      setUser({displayName, email});
      localStorage.setItem('user', JSON.stringify({
        displayName,
        email
      }));
      localStorage.setItem('token', token);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      setToken(null);
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }).catch((error) => {
      // An error happened.
    });
  }

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
      <section style={{alignSelf: 'center', cursor: 'pointer', width: 150}}>
        {
           Boolean(user) ?  <ul className="menu">
            <li className="menuItem dropdown-item">
              <h4 >{user?.displayName}</h4>
              <ul
                role="menu"
                style={{width: 100}}
                className="dropdown-menu"
              >
                <li onClick={handleLogout} className="link">Logout</li>
              </ul>
            </li>
           </ul> 
           : <section style={{alignSelf: 'center', cursor: 'pointer'}} onClick={openLoginPopup}>Login</section>
        }
      </section>
    </StickyHeader>
  )
}

export default TopNavBar;