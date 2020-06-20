import { put, takeEvery } from 'redux-saga/effects';

import axios from 'axios';

import { setUserData, setLoginFailed } from './actions';

import {
  baseUrl,
  CHECK_LOGIN,
  LOGIN,
  LOGOUT,
} from '../../constants';



function* checkLoginUser() {
  const localAccessToken = localStorage.getItem('login');
  if (localAccessToken) {
    const config = {
      headers: { Authorization: `Bearer ${localAccessToken}` }
    };
    const userInfo = yield axios.post(`${baseUrl}wp-json/wp/v2/users/me`, {}, config)
        .then(response => response.data)
        .catch((error) => console.error(error));
    if (userInfo) yield put(setUserData(userInfo));
  }

}

function* loginUser({ payload: { username, password } }) {
  const token = yield axios.post(`${baseUrl}wp-json/jwt-auth/v1/token/`, {
    username: username,
    password: password,
  })
    .then(response => {
      const res = response.data.token;
      if ( response.status === 200 ) {
        localStorage.setItem( 'login', res );
      }
      return res;
    })
    .catch(error => error.response.data.code);
  console.log(token)
  if (token.id) yield put(setUserData(token));
  else if (token === '[jwt_auth] incorrect_password') yield put(setLoginFailed('the password is incorrect'))
  else if (token === '[jwt_auth] invalid_email') yield put(setLoginFailed('the email is incorrect'))
  else yield put(setUserData('login failed'))
}

function* logoutUser() {
  yield localStorage.removeItem('login');
}

export default function* woocommerceProviderSaga() {
  yield takeEvery(LOGIN, loginUser);
  yield takeEvery(LOGOUT, logoutUser);
  yield takeEvery(CHECK_LOGIN, checkLoginUser)
}
