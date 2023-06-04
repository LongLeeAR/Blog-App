import { call, put, takeLatest } from "redux-saga/effects";
import { loadingSpinnerActions } from "shared/components/LoadingSpinner/LoadingSpinner.slice";

import { fetchBlogDetailService, fetchBlogListService, saveBlogService } from "./Blogs.services";
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
  const response = yield call(saveBlogService, payload.blog, payload.app);

  if (response) {
    yield put(blogsActions.saveBlogSuccess(response))
  }
  
  yield put(loadingSpinnerActions.toggleLoadingSpinner(false));
}

export function* watchSaveBlog () {
  yield takeLatest(blogsActions.saveBlog.type, saveBlog);
}


export function* fetchBlogDetail(action) {
  yield put(loadingSpinnerActions.toggleLoadingSpinner(true));
  const response = yield call(fetchBlogDetailService, action.payload);

  if (response) {
    yield put(blogsActions.fetchBlogDetailSuccess(response))
  } else {
    yield put(blogsActions.fetchBlogDetailFailure());
  }
  yield put(loadingSpinnerActions.toggleLoadingSpinner(false));
}

export function* watchFetchBlogDetail () {
  yield takeLatest(blogsActions.fetchBlogDetail.type, fetchBlogDetail);
}

