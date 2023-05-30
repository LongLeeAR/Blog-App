import { createSelector } from "@reduxjs/toolkit";

export const selectBlogs = (state) => state.blogs

export const selectIsFetchingBlogDetail = createSelector(
  selectBlogs,
  (blogsState) => blogsState.isFetchingBlogDetail || false
)

export const selectIsSaveBlogSuccess = createSelector(
  selectBlogs,
  (blogsState) => blogsState.isSaveBlogSuccess || false
)

export const selectBlogById = createSelector(
  selectBlogs,
  (_, blogId) => blogId,
  (blogsState, blogId) => {
    if (!blogsState?.data) {
      return null;
    }

    return blogsState.data[blogId];
  }
)