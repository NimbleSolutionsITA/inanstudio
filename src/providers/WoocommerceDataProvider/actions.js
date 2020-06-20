/*
 *
 * WoocommerceDataProvider actions
 *
 */

import { FETCH_WOOCOMMERCE_DATA,
  SET_WOOCOMMERCE_DATA,
  CREATE_WOOCOMMERCE_CUSTOMER,
  SET_WOOCOMMERCE_CUSTOMER_RESPONSE,
  UPDATE_WOOCOMMERCE_CUSTOMER
} from '../../constants';

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
export function registerCustomer(data) {
  return {
    type: CREATE_WOOCOMMERCE_CUSTOMER,
    payload: {
      data,
    },
  };
}
export function setCustomerResponse(response) {
  return {
    type: SET_WOOCOMMERCE_CUSTOMER_RESPONSE,
    payload: {
      response,
    },
  };
}
export function updateCustomer(id, data) {
  return {
    type: UPDATE_WOOCOMMERCE_CUSTOMER,
    payload: {
      id,
      data,
    },
  };
}