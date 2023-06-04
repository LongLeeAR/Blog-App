import { combineReducers } from '@reduxjs/toolkit';
import { loadingSpinnerReducer } from 'shared/components/LoadingSpinner/LoadingSpinner.slice';
import { blogDetailReducer } from 'views/Blogs/BlogDetail/BlogDetail.slice';
import { blogsReducer } from 'views/Blogs/Blogs.slice';
import { authReducers } from 'views/Login/Auth.slice';

const UIReducers = combineReducers({
  loadingSpinner: loadingSpinnerReducer,
})

const rootReducer = combineReducers({
  uiState: UIReducers,
  blogDetail: blogDetailReducer,
  blogs: blogsReducer,
  auth: authReducers,
  // Other state
})

export default rootReducer;