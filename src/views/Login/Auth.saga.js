import { call, put, takeLatest } from "redux-saga/effects";
import { loginService, logoutService } from "./Auth.services";
import { authActions } from "./Auth.slice";

export function* login() {
  const response = yield call(loginService);

  if (response) {
    yield put(authActions.loginSuccess(response));
  } else {
    yield put(authActions.loginFailure());
  }
}

export function* watchLogin() {
  yield takeLatest(authActions.login.type, login);
}

export function* logout() {
  const response = yield call(logoutService);

  if (response) {
    yield put(authActions.logoutSuccess());
  }
}

export function* watchLogout() {
  yield takeLatest(authActions.logout.type, logout);
}