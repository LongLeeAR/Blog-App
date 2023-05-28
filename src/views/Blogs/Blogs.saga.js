import { call, put, takeLatest } from "redux-saga/effects";
import { loadingSpinnerActions } from "shared/components/LoadingSpinner/LoadingSpinner.slice";

import { fetchBlogListService, saveBlogService } from "./Blogs.services";
import { blogsActions } from "./Blogs.slice";

export function* fetchBlogList () {
  yield put(loadingSpinnerActions.toggleLoadingSpinner(true));
  const response = yield call(fetchBlogListService);
  
  if (response) {
    yield put(blogsActions.fetchBlogsSuccess(response))
  }

  yield put(loadingSpinnerActions.toggleLoadingSpinner(false));
}

export function* watchFetchBlogList () {
  yield takeLatest(blogsActions.fetchBlogs.type, fetchBlogList);
}

export function* saveBlog({payload}) {
  yield put(loadingSpinnerActions.toggleLoadingSpinner(true));
  const response = yield saveBlogService(payload.blog, payload.app);

  if (response) {
    yield put(blogsActions.saveBlogSuccess(response))
  }
  
  yield put(loadingSpinnerActions.toggleLoadingSpinner(false));
}

export function* watchSaveBlog () {
  yield takeLatest(blogsActions.saveBlog.type, saveBlog);
}

