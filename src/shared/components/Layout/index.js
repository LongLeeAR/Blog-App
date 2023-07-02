import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { OWNER_EMAIL } from 'shared/constants';
import { useActions } from 'shared/redux/useActions';
import { useFirebaseConfig } from 'views/FirebaseProvider';
import { selectUser } from 'views/Login/Auth.selectors';
import { loadingSpinnerActions } from '../LoadingSpinner/LoadingSpinner.slice';
import './index.css';

const Layout = (props) => {
  const { isEditable = true, title, isBlogDetail, introduction, children, rightContent, imgUrl, isAboutPage } = props;
  const {app} = useFirebaseConfig();
  const user = useSelector(selectUser);
  const isOwner = user?.email === OWNER_EMAIL;
  const {blogRouteType}  = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const {toggleLoading} = useActions({
    toggleLoading: loadingSpinnerActions.toggleLoadingSpinner
  })

  const storage = getStorage(app);
  const cvFileRef = ref(storage, 'files/CV.pdf');

  const addNewBlog = () => {
    if (blogRouteType) {
      navigate(`/tao-moi/${blogRouteType}`)
    } else {
      navigate('/tao-moi')
    }
  }

  const onCVChange = (event) => {
    toggleLoading(true);
    const {target: {files: [file]}} = event;
    
    uploadBytes(cvFileRef, file).then((snapshot) => {
      setFile(snapshot.metadata);
      toggleLoading(false);
    });
  }

  const handleDownloadFile = () => {
    
    getDownloadURL(cvFileRef).then(url => {
      window.open(url, '_blank')
    })
  }

  const onSearching = () => {
    // showToast({
    //   type: 'success',
    //   message: 'Search something very longgg like thiss!!',
    //   duration: 5000
    // })
  }
  

  return (
  <div className='page-container'>
    <div className='content-container'>
      <section className='left-content'>
        <section className='content-title'>
          {
            !isBlogDetail && <>
              <section className="title">
                <h3>
                  {
                    imgUrl && <img
                      className="big-emoji"
                      alt="title"
                      src={imgUrl}
                    />
                  }
                  {title}
                </h3>
                {
                  (isOwner && isEditable) && <i onClick={addNewBlog} className='fa fa-plus'></i>
                }
              </section>
              <p className='introduction'>{introduction}</p>
              {
                isAboutPage && <section>
                  {
                    isOwner && <>
                      <label htmlFor="cvInput" style={{cursor: 'pointer', fontWeight: 'bold'}}>CV:</label>
                      <input onChange={onCVChange} type="file" accept='application/pdf' id="cvInput" style={{display: 'none'}} />
                    </>
                  }
                  <span className="fileSection" onClick={handleDownloadFile}>
                    {file?.name ?? 'CV.pdf'}
                  </span>
                </section>
              }
            </>
          }
          {
            isBlogDetail && <section className="go-back-btn" onClick={() => navigate(-1)}>
              <i className="fa fa-arrow-left" style={{marginRight: 8}} />
              <span>Quay lại</span>
            </section>
          }
        </section>
        <section className='content'>
          {children}
        </section>
      </section>
      <section className='right-content'>
        <section className='social-items'>
          <a
            className='social-item'
            title='Facebook'
            href='https://www.facebook.com/longhaile123'
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-facebook"/>
          </a>
          <a
            className='social-item'
            title='LinkedIn'
            href='https://www.linkedin.com/in/l%C3%AA-h%E1%BA%A3i-long-a60a6b15b/'
            target="_blank"
            rel="noreferrer"
          >
              <i className="fa fa-linkedin"/>
          </a>
          <a
            className='social-item'
            title='Instagram'
            href='https://www.instagram.com/h_long_le/?hl=en'
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-instagram"/>
          </a>
          <a className='social-item' title='Facebook'><i className="fa fa-twitter"/></a>
        </section>
        <section className='search'>
          <input onClick={onSearching} className='search-input' type="search" placeholder='Tìm kiếm' />
          <button className='search-icon'><i className='fa fa-search'></i></button>
        </section>
        {rightContent && rightContent}
      </section>
    </div>
    <section className='footer'>
        --------Long Hai Le--------
    </section>
  </div>
  )
}

export default Layout;
