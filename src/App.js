import { useEffect } from "react";
import { Provider } from 'react-redux';
import {
  Navigate, Route, Routes,
  useLocation
} from "react-router-dom";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import ToastProvider from 'shared/components/Toast';
import store from 'shared/redux/store';
import { About } from "views/About";
import Blogs from 'views/Blogs';
import BlogEditor from 'views/Blogs/BlogEditor';
import { FirebaseProvider } from "views/FirebaseProvider";
import Photos from 'views/Photos/Photos';
import TopNavBar from 'views/TopNavBar';
import './App.css';

function App() {
  const location = useLocation();

  // Watch the url changes then scroll to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
 
  return (
    <div className="App">
      <Provider store={store}>
        <LoadingSpinner>
          <ToastProvider>
            <FirebaseProvider>
              <TopNavBar />
              <Routes>
                <Route path="/" element={<Navigate to="tap-but" />} />
                <Route path="tap-but" element={<Blogs/>} >
                  <Route index path=":blogRouteType/:blogId?" element={<Blogs/>} />
                </Route>
                <Route path="photos" element={<Photos />} />
                <Route path="chinh-sua" element={<BlogEditor />} >
                  <Route path=":blogId" element={<BlogEditor />} />
                </Route>
                <Route path="tao-moi" element={<BlogEditor />} >
                  <Route path=":blogType" element={<BlogEditor />} />
                </Route>
                <Route path="gioi-thieu" element={<About />} />
              </Routes>
            </FirebaseProvider>
          </ToastProvider>
        </LoadingSpinner>
      </Provider>
    </div>
  );
}

export default App;
