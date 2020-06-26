import { put, takeEvery } from 'redux-saga/effects';

import axios from 'axios';

import {setUserData, setLoginFailed, setAuthenticated,setUserInfo as setUserInfoAction} from './actions';

import {
  baseUrl,
  CHECK_LOGIN,
  LOGIN,
  LOGOUT,
  SET_USER_INFO,
  WCHeaders,
  woocommerceVersion,
} from '../../constants';
import {setWoocommerceData} from "../WoocommerceDataProvider/actions";



function* checkLoginUser() {
  const localAccessToken = localStorage.getItem('login');
  if (localAccessToken) {
    const config = {
      headers: { Authorization: `Bearer ${localAccessToken}` }
    };
    const userInfo = yield axios.post(`${baseUrl}wp-json/wp/v2/users/me`, {}, config)
        .then(response => response.data)
        .catch((error) => console.error(error));

    if (userInfo) yield put(setUserInfoAction(userInfo))
  }
}

function* setUserInfo({ payload: userInfo }) {
  const requestOptions = {
    method: 'GET',
    headers: WCHeaders(),
    redirect: 'follow'
  };
  const data = yield fetch(`${baseUrl}wp-json/${woocommerceVersion}/customers/${userInfo.id}`, requestOptions)
      .then(response => response.json())
      .catch(error => error.code);

  if (data) {
    yield put(setWoocommerceData(`customers-${userInfo.id}`, data));
    yield put(setUserData(userInfo))
    yield put(setAuthenticated())
  }
}

function* loginUser({ payload: { username, password } }) {
  const response = yield axios.post(`${baseUrl}wp-json/jwt-auth/v1/token/`, {
    username: username,
    password: password,
  })
    .then(response => {
      const res = response.data;
      if ( response.status === 200 ) {
        localStorage.setItem( 'login', res.token );
      }
      return res;
    })
    .catch(error => error.response.data.code);
  if (response.token) {
    const token = response.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const userInfo = yield axios.post(`${baseUrl}wp-json/wp/v2/users/me`, {}, config)
        .then(response => response.data)
        .catch((error) => console.error(error));
    if (userInfo) yield put(setUserInfoAction(userInfo))
  }
  else if (response === '[jwt_auth] incorrect_password') yield put(setLoginFailed('the password is incorrect'))
  else if (response === '[jwt_auth] invalid_email') yield put(setLoginFailed('the email is incorrect'))
  else yield put(setLoginFailed('login failed'))
}

function* logoutUser() {
  yield localStorage.removeItem('login');
}

export default function* authProviderSaga() {
  yield takeEvery(LOGIN, loginUser);
  yield takeEvery(LOGOUT, logoutUser);
  yield takeEvery(CHECK_LOGIN, checkLoginUser)
  yield takeEvery(SET_USER_INFO, setUserInfo)
}
