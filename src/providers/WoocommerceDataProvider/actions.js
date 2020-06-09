/*
 *
 * WoocommerceDataProvider actions
 *
 */

import { FETCH_WOOCOMMERCE_DATA, SET_WOOCOMMERCE_DATA } from '../../constants';

export function fetchWoocommerceData(key, apiPath) {
  return {
    type: FETCH_WOOCOMMERCE_DATA,
    payload: {
      key,
      apiPath,
    },
  };
}

export function setWoocommerceData(key, data) {
  return {
    type: SET_WOOCOMMERCE_DATA,
    payload: {
      key,
      data,
    },
  };
}
