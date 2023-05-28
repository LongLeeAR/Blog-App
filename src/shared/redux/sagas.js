import { all, fork } from "redux-saga/effects";
import { watchFetchBlogDetail } from "views/Blogs/BlogDetail/BlogDetail.saga";
import { watchFetchBlogList, watchSaveBlog } from "views/Blogs/Blogs.saga";

export default function* rootSaga () {
  yield all([
    fork(watchFetchBlogDetail),
    fork(watchSaveBlog),
    fork(watchFetchBlogList)
  ])
}