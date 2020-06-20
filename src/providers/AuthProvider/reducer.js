/*
 *
 * AuthProvider reducer
 *
 */
import produce from 'immer';

import { LOGIN, SET_USER_DATA, LOGOUT, SET_LOGIN_FAILED } from '../../constants';

export const initialState = {authenticated: false, authenticating: false, error: false};

/* eslint-disable default-case, no-param-reassign */
const UserDataReducer = () => (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
        case LOGIN:
            return {authenticated: false, authenticating: true};
        case SET_USER_DATA:
            Object.assign(draft, action.payload.userInfo, {authenticated: true, authenticating: false});
            break;
        case LOGOUT:
            return {authenticated: false, authenticating: false};
        case SET_LOGIN_FAILED:
            return {error: action.payload.error, authenticated: false, authenticating: false}
    }
  });

export default UserDataReducer;