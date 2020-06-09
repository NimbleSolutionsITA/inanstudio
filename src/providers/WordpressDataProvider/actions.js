/*
 *
 * WordpressDataProvider actions
 *
 */

import { FETCH_WORDPRESS_DATA, SET_WORDPRESS_DATA } from '../../constants';

export function fetchWordpressData(key, apiPath) {
  return {
    type: FETCH_WORDPRESS_DATA,
    payload: {
      key,
      apiPath,
    },
  };
}

export function setWordpressData(key, data) {
  return {
    type: SET_WORDPRESS_DATA,
    payload: {
      key,
      data,
    },
  };
}



