import { put, takeLatest } from 'redux-saga/effects';
import { loadingSpinnerActions } from 'shared/components/LoadingSpinner/LoadingSpinner.slice';
import { fetchBlogDetailService } from './BlogDetail.services';
import { blogDetailActions } from './BlogDetail.slice';

export function* fetchBlogDetail(action) {
  yield put(loadingSpinnerActions.toggleLoadingSpinner(true));
  const response = yield fetchBlogDetailService(action.payload);

  if (response) {
    yield put(blogDetailActions.fetchBlogDetailSuccess(response))
  }
  yield put(loadingSpinnerActions.toggleLoadingSpinner(false));
}

export function* watchFetchBlogDetail () {
  yield takeLatest(blogDetailActions.fetchBlogDetail.type, fetchBlogDetail);
}

