import { put, takeEvery } from 'redux-saga/effects';
import Wordpress from '@wordpress/api-fetch';

import { setWordpressData } from './actions';
import {
  baseUrl,
  FETCH_WORDPRESS_DATA,
} from '../../constants';

function* fetchData({ payload: { key, apiPath } }) {
  const data = yield Wordpress( { path: `${baseUrl}wp-json/wp/v2/${apiPath}` } )
    .then(response => response)
    .catch(() => null);
  if (data) {
    yield put(setWordpressData(key, data));
  }
}

export default function* authProviderSaga() {
  yield takeEvery(FETCH_WORDPRESS_DATA, fetchData);
}
