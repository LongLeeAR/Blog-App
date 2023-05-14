import { useEffect } from "react";
import {
  Navigate, Route, Routes,
  useLocation
} from "react-router-dom";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { About } from "views/About";
import BlogDetail from "views/Blogs/BlogDetail";
import BlogEditor from 'views/Blogs/BlogEditor/BlogEditor';
import Blogs from 'views/Blogs/Blogs';
import { FirebaseProvider } from "views/FirebaseProvider";
import Photos from 'views/Photos/Photos';
import TopNavBar from 'views/TopNavBar/TopNavBar';
import './App.css';

function App() {
  const location = useLocation();

  // Watch the url changes then scroll to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
 
  return (
    <div className="App">
      <LoadingSpinner>
        <FirebaseProvider>
          <TopNavBar />
          <Routes>
            <Route path="/" element={<Navigate to="tap-but" />} />
            <Route path="tap-but" element={<Blogs/>} >
              <Route index path=":blogRouteType/:blogId?" element={<Blogs/>} />
            </Route>
            {/* <Route path="bai-viet/:blogId" element={<BlogDetail />} /> */}
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
      </LoadingSpinner>
    </div>
  );
}

export default App;
