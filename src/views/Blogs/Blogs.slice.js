import { createSlice } from "@reduxjs/toolkit";


export const initialState = {
  data: null,
  isFetchingBlogDetail: false,
  blogSavingStatus: 'not-yet',
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
      state.blogSavingStatus = 'pending';
    },
    saveBlogSuccess: (state, {payload}) => {
      if (state.data) {
        state.data[payload.id] = payload;
      } else {
        state.data = {
          [payload.id]: payload
        }
      }
      state.blogSavingStatus = 'success'
    },
    saveBlogFailure: (state) => {
      state.blogSavingStatus = 'failure'
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
      state.blogSavingStatus = 'not-yet';
    }
  }
})

export const blogsReducer = blogsSlice.reducer;

export const  blogsActions = blogsSlice.actions;