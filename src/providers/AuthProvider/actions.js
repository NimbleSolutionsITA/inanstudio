/*
 *
 * AuthProvider actions
 *
 */
import {
  CHECK_LOGIN,
  LOGIN,
  LOGOUT,
  SET_USER_DATA,
  SET_LOGIN_FAILED,
  SET_AUTHENTICATED,
  SET_USER_INFO
} from '../../constants';


export function checkLogin() {
  return {
    type: CHECK_LOGIN,
    payload: {},
  };
}

export function login(username, password) {
  return {
    type: LOGIN,
    payload: {
      username,
      password,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: {},
  };
}

export function setUserData(userInfo) {
  return {
    type: SET_USER_DATA,
    payload: {
      userInfo,
    },
  };
}
export function setLoginFailed(error) {
  return {
    type: SET_LOGIN_FAILED,
    payload: {
      error,
    },
  };
}

export function setUserInfo(userInfo) {
  return {
    type: SET_USER_INFO,
    payload: userInfo,
  };
}

export function setAuthenticated() {
  return {
    type: SET_AUTHENTICATED,
  };
}
