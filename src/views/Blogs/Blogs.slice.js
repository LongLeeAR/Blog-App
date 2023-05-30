import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isFetchingBlogDetail: false,
  isSaveBlogSuccess: false,
}

const blogsSlice = createSlice({
  initialState,
  name: 'blogs',
  reducers: {
    fetchBlogs: (state) => {
      state.data = null;
    },
    fetchBlogsSuccess: (state, {payload}) => {
      state.data = payload
    },
    saveBlog: (state) => {
      state.isSaveBlogSuccess = false;
    },
    saveBlogSuccess: (state, {payload}) => {
      if (state.data) {
        state.data[payload.id] = payload;
      } else {
        state.data = {
          [payload.id]: payload
        }
      }
      state.isSaveBlogSuccess = true
    },
    fetchBlogDetail: (state) => {
      state.isFetchingBlogDetail = true
    },
    fetchBlogDetailSuccess: (state, {payload}) => {
      if (state.data) {
        state.data[payload.id] = payload;
      } else {
        state.data = {
          [payload.id]: payload
        }
      }
      state.isFetchingBlogDetail = false;
    },
    fetchBlogDetailFailure: (state) => {
      state.isFetchingBlogDetail = false;
    },
    resetFlag: (state) => {
      state.isFetchingBlogDetail = false;
      state.isSaveBlogSuccess = false;
    }
  }
})

export const blogsReducer = blogsSlice.reducer;

export const  blogsActions = blogsSlice.actions;