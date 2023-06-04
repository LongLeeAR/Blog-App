import { createSelector } from "@reduxjs/toolkit";

export const selectAuthState = (state) => state.auth;

export const selectLoginStatus = createSelector(
  selectAuthState,
  (authState) => authState.loginStatus
)

export const selectUser = createSelector(
  selectAuthState,
  (authState) => authState.user
)