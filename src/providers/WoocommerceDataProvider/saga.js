import { put, takeEvery } from 'redux-saga/effects';

import { setWoocommerceData, setCustomerResponse } from './actions';

import {
  baseUrl,
  CREATE_WOOCOMMERCE_CUSTOMER,
  UPDATE_WOOCOMMERCE_CUSTOMER,
  FETCH_WOOCOMMERCE_DATA,
  woocommerceVersion,
} from '../../constants';

const myHeaders = new Headers();
const encodedData = window.btoa(process.env.REACT_APP_WOOCOMMERCE_CLIENT + ':' + process.env.REACT_APP_WOOCOMMERCE_SECRET);
const authorizationHeaderString = 'Basic ' + encodedData;
myHeaders.append("Authorization", authorizationHeaderString);
myHeaders.append("Content-Type", 'application/json')

function* fetchData({ payload: { key, apiPath } }) {
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

function* createCustomer({ payload: { data } }) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
    }),
    headers: myHeaders,
    redirect: 'follow'
  };
  const res = yield fetch(`${baseUrl}wp-json/${woocommerceVersion}/customers`, requestOptions)
      .then(response => response.json())
      .catch(error => error);
  yield put(setCustomerResponse(res))
}

function* updateCustomer({ payload: { id, data } }) {
  const body = {
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    password: data.password,
    shipping: data.shipping,
    billing: data.billing,
  }

  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: myHeaders,
    redirect: 'follow'
  };
  const res = yield fetch(`${baseUrl}wp-json/${woocommerceVersion}/customers/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => error);
  yield put(setCustomerResponse(res))
}

export default function* woocommerceProviderSaga() {
  yield takeEvery(FETCH_WOOCOMMERCE_DATA, fetchData);
  yield takeEvery(CREATE_WOOCOMMERCE_CUSTOMER, createCustomer);
  yield takeEvery(UPDATE_WOOCOMMERCE_CUSTOMER, updateCustomer);
}
