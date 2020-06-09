/*
 *
 * WoocommerceDataProvider reducer
 *
 */
import produce from 'immer';

import { SET_WOOCOMMERCE_DATA } from '../../constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const WoocommerceDataReducer = () => (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_WOOCOMMERCE_DATA:
        Object.assign(draft, { [action.payload.key]: action.payload.data });
        break;
    }
  });

export default WoocommerceDataReducer;