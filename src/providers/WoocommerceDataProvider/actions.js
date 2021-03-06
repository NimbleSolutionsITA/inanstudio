/*
 *
 * WoocommerceDataProvider actions
 *
 */

import {
  FETCH_WOOCOMMERCE_DATA,
  SET_WOOCOMMERCE_DATA,
  CREATE_WOOCOMMERCE_CUSTOMER,
  SET_WOOCOMMERCE_CUSTOMER_RESPONSE,
  UPDATE_WOOCOMMERCE_CUSTOMER,
  CREATE_WOOCOMMERCE_ORDER,
  UPDATE_WOOCOMMERCE_ORDER,
  SET_WOOCOMMERCE_ORDER_RESPONSE,
  DELETE_WOOCOMMERCE_ORDER, SET_WOOCOMMERCE_CUSTOMER_UPDATE_RESPONSE,
} from '../../constants';

export function fetchWoocommerceData(key, apiPath, params) {
  return {
    type: FETCH_WOOCOMMERCE_DATA,
    payload: {
      key,
      apiPath,
      params,
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

export function createOrder(order) {
  return {
    type: CREATE_WOOCOMMERCE_ORDER,
    payload: {
      order,
    },
  };
}
export function updateOrder(id, order) {
  return {
    type: UPDATE_WOOCOMMERCE_ORDER,
    payload: {
      id,
      order,
    },
  };
}
export function setCustomerUpdateResponse(response, data) {
  return {
    type: SET_WOOCOMMERCE_CUSTOMER_UPDATE_RESPONSE,
    payload: {
      response,
      data,
    },
  };
}
export function deleteOrder(id) {
  return {
    type: DELETE_WOOCOMMERCE_ORDER,
    payload: {
      id,
    },
  };
}
export function setOrderResponse(response) {
  return {
    type: SET_WOOCOMMERCE_ORDER_RESPONSE,
    payload: {
      error: response.message,
      data: response.id ? response : null,
    },
  };
}