/*
 *
 * AuthProvider actions
 *
 */
import {CHECK_LOGIN, LOGIN, LOGOUT, SET_USER_DATA} from '../../constants';


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
