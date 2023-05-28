const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  data: null,
  isSaveBlogSuccess: false
};

const blogDetailSlice = createSlice({
  name: 'blogDetail',
  initialState,
  reducers: {
    fetchBlogDetail: (state) => {
      state.data = null;
    },
    fetchBlogDetailSuccess: (state, {payload}) => {
      state.data = payload;
    },
    saveBlog: (state) => {
      state.isSaveBlogSuccess = false;
    },
    saveBlogSuccess: (state) => {
      state.isSaveBlogSuccess = true
    },
    resetBlogData: (state) => {
      state.data = null;
    }
  }
})

export const blogDetailActions = blogDetailSlice.actions;

export const blogDetailReducer = blogDetailSlice.reducer;
