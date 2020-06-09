import { put, takeEvery } from 'redux-saga/effects';

import { setWoocommerceData } from './actions';

import {
  baseUrl,
  FETCH_WOOCOMMERCE_DATA,
  woocommerceVersion,
} from '../../constants';

function* fetchData({ payload: { key, apiPath } }) {
  const myHeaders = new Headers();
  const encodedData = window.btoa(process.env.REACT_APP_WOOCOMMERCE_CLIENT + ':' + process.env.REACT_APP_WOOCOMMERCE_SECRET);
  const authorizationHeaderString = 'Basic ' + encodedData;
  myHeaders.append("Authorization", authorizationHeaderString);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const data = yield fetch(`${baseUrl}wp-json/${woocommerceVersion}/${apiPath}`, requestOptions)
      .then(response => response.json())
      .catch(error => error.code);

  if (data) {
    yield put(setWoocommerceData(key, data));
  }
}

export default function* woocommerceProviderSaga() {
  yield takeEvery(FETCH_WOOCOMMERCE_DATA, fetchData);
}
