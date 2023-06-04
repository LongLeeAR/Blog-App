import { all, fork } from "redux-saga/effects";
import { watchFetchBlogDetail, watchFetchBlogList, watchSaveBlog } from "views/Blogs/Blogs.saga";
import { watchLogin, watchLogout } from "views/Login/Auth.saga";

export default function* rootSaga () {
  yield all([
    fork(watchFetchBlogDetail),
    fork(watchSaveBlog),
    fork(watchFetchBlogList),
    fork(watchLogin),
    fork(watchLogout),
  ])
}