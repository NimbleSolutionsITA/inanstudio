/*
 *
 * WoocommerceDataProvider reducer
 *
 */
import produce from 'immer';

import {CREATE_WOOCOMMERCE_CUSTOMER,
  SET_WOOCOMMERCE_CUSTOMER_RESPONSE,
  SET_WOOCOMMERCE_DATA,
  UPDATE_WOOCOMMERCE_CUSTOMER,
  CREATE_WOOCOMMERCE_ORDER,
  UPDATE_WOOCOMMERCE_ORDER,
  DELETE_WOOCOMMERCE_ORDER,
  SET_WOOCOMMERCE_ORDER_RESPONSE,
} from '../../constants';

export const initialState = {};

const WoocommerceDataReducer = () => (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_WOOCOMMERCE_DATA:
        Object.assign(draft, { [action.payload.key]: action.payload.data });
        break;
      case CREATE_WOOCOMMERCE_CUSTOMER:
        Object.assign(draft, {creatingUser: true, userCreated: false});
        break;
      case UPDATE_WOOCOMMERCE_CUSTOMER:
        Object.assign(draft, {creatingUser: true, userCreated: false, [`customers-${action.payload.id}`]: {...draft[`customers-${action.payload.id}`], ...action.payload.data}});
        break;
      case SET_WOOCOMMERCE_CUSTOMER_RESPONSE:
        Object.assign(draft, {creatingUser: false, userCreated: !!action.payload.response.id, error: action.payload.response.message});
        break;
      case CREATE_WOOCOMMERCE_ORDER:
        Object.assign(draft, {creatingOrder: true, orderCreated: false});
        break;
      case UPDATE_WOOCOMMERCE_ORDER:
        Object.assign(draft, {creatingOrder: true, orderCreated: false});
        break;
      case DELETE_WOOCOMMERCE_ORDER:
        Object.assign(draft, {creatingOrder: true, orderCreated: false, currentOrder: null});
        break;
      case SET_WOOCOMMERCE_ORDER_RESPONSE:
        if (action.payload.error)
          Object.assign(draft, {creatingOrder: false, orderCreated: !!action.payload.data, error: action.payload.error});
        else Object.assign(draft, {creatingOrder: false, orderCreated: true, error: null, currentOrder: {...action.payload.data}});
        break;
      default:
        return;
    }
  });

export default WoocommerceDataReducer;