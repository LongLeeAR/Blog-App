import { LOGIN_STATUS } from "./constant";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loginStatus: LOGIN_STATUS.NO_LOGIN,
  user: null,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  key: 'auth',
  reducers: {
    login: (state) => {
      state.loginStatus = LOGIN_STATUS.NO_LOGIN;
    },
    loginSuccess: (state, action) => {
      state.loginStatus = LOGIN_STATUS.SUCCESS;
      state.user =  action.payload;
    },
    loginFailure: (state) => {
      state.loginStatus = LOGIN_STATUS.FAILURE;
    },
    setLoginInfo: (state, action) => {
      state.user = JSON.parse(action.payload);
    },
    logout: () => {},
    logoutSuccess: () => {
      return initialState;
    }
  }
})

export const authReducers = authSlice.reducer;

export const authActions = authSlice.actions;