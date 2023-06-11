import { createSelector } from "@reduxjs/toolkit";
import { initialState } from './Blogs.slice';

export const selectBlogsState = (state) => state.blogs || initialState;

export const selectBlogs = createSelector(
  selectBlogsState,
  (blogsState) => {
    const blogsById = blogsState.data;

    if (!blogsById) {
      return [];
    }
    
    return Object.values(blogsById).sort((a, b) => b.time - a.time);
  }
)

export const selectIsFetchingBlogDetail = createSelector(
  selectBlogsState,
  (blogsState) => blogsState.isFetchingBlogDetail || false
)

export const selectSavingBlogStatus = createSelector(
  selectBlogsState,
  (blogsState) => blogsState.blogSavingStatus
)

export const selectBlogById = createSelector(
  selectBlogsState,
  (_, blogId) => blogId,
  (blogsState, blogId) => {
    if (!blogsState?.data) {
      return null;
    }

    return blogsState.data[blogId];
  }
)