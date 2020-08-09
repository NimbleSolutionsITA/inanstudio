import { put, takeEvery } from 'redux-saga/effects';

import { setWoocommerceData, setCustomerResponse, setCustomerUpdateResponse, setOrderResponse } from './actions';

import {login, setUserInfo as setUserInfoAction} from "../AuthProvider/actions";

import {
  baseUrl,
  CREATE_WOOCOMMERCE_CUSTOMER,
  UPDATE_WOOCOMMERCE_CUSTOMER,
  FETCH_WOOCOMMERCE_DATA,
  CREATE_WOOCOMMERCE_ORDER,
  UPDATE_WOOCOMMERCE_ORDER,
  DELETE_WOOCOMMERCE_ORDER,
  woocommerceVersion,
} from '../../constants';

import {WCHeaders} from "../../constants";
import axios from "axios";

function* fetchData({ payload: { key, apiPath, params } }) {
  const requestOptions = {
    method: 'GET',
    headers: WCHeaders(),
    redirect: 'follow'
  };
  const url = new URL(`${baseUrl}wp-json/${woocommerceVersion}/${apiPath}`);
  if (params)
    url.search = new URLSearchParams(params).toString();

  const data = yield fetch(url, requestOptions)
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
    headers: WCHeaders(),
    redirect: 'follow'
  };
  const res = yield fetch(`${baseUrl}wp-json/${woocommerceVersion}/customers`, requestOptions)
      .then(response => response.json())
      .catch(error => error);
  yield put(setCustomerResponse(res))
  if (res.id)
    yield put(login(data.email, data.password))
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
    headers: WCHeaders(),
    redirect: 'follow'
  };
  const res = yield fetch(`${baseUrl}wp-json/${woocommerceVersion}/customers/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => error);
  yield put(setCustomerUpdateResponse(res))
  const localAccessToken = localStorage.getItem('login');
  if (localAccessToken) {
    const config = {
      headers: {Authorization: `Bearer ${localAccessToken}`}
    };
    const userInfo = yield axios.post(`${baseUrl}wp-json/wp/v2/users/me`, {}, config)
        .then(response => response.data)
        .catch((error) => console.error(error));
    if (userInfo) yield put(setUserInfoAction(userInfo))
  }
}

function* createOrder({ payload: { order } }) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: WCHeaders(),
    redirect: 'follow'
  };
  const res = yield fetch(`${baseUrl}wp-json/${woocommerceVersion}/orders`, requestOptions)
      .then(response => response.json())
      .catch(error => error);
  yield put(setOrderResponse(res))
}

function* updateOrder({ payload: { id, order } }) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(order),
    headers: WCHeaders(),
    redirect: 'follow'
  };
  const res = yield fetch(`${baseUrl}wp-json/${woocommerceVersion}/orders/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => error);
  yield put(setOrderResponse(res))
}

function* deleteOrder({ payload: { id } }) {
  const requestOptions = {
    method: 'DELETE',
    headers: WCHeaders(),
    redirect: 'follow'
  };
  yield fetch(`${baseUrl}wp-json/${woocommerceVersion}/orders/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => error);
  yield put(setOrderResponse({}))
}


export default function* woocommerceProviderSaga() {
  yield takeEvery(FETCH_WOOCOMMERCE_DATA, fetchData);
  yield takeEvery(CREATE_WOOCOMMERCE_CUSTOMER, createCustomer);
  yield takeEvery(UPDATE_WOOCOMMERCE_CUSTOMER, updateCustomer);
  yield takeEvery(CREATE_WOOCOMMERCE_ORDER, createOrder);
  yield takeEvery(UPDATE_WOOCOMMERCE_ORDER, updateOrder);
  yield takeEvery(DELETE_WOOCOMMERCE_ORDER, deleteOrder);
}
