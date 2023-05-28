import { combineReducers } from '@reduxjs/toolkit';
import { loadingSpinnerReducer } from 'shared/components/LoadingSpinner/LoadingSpinner.slice';
import { blogDetailReducer } from 'views/Blogs/BlogDetail/BlogDetail.slice';
import { blogsReducer } from 'views/Blogs/Blogs.slice';

const UIReducers = combineReducers({
  loadingSpinner: loadingSpinnerReducer,
})

const rootReducer = combineReducers({
  uiState: UIReducers,
  blogDetail: blogDetailReducer,
  blogs: blogsReducer
  // Other state
})

export default rootReducer;