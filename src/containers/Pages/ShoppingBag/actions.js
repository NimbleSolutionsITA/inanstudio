/*
 *
 * Cart actions
 *
 */

import { DELETE_CART_ITEM, ADD_CART_ITEM, UPDATE_CART_ITEM, DESTROY_CART } from '../../../constants';


export function addCartItem(id, name, price, leather, size, color, image, slug, qty) {
  return {
    type: ADD_CART_ITEM,
    payload: {
      id,
      name,
      price,
      leather,
      size,
      color,
      image,
      slug,
      qty,
    },
  };
}

export function updateCartItem(id, qty) {
  return {
    type: UPDATE_CART_ITEM,
    payload: {
      id,
      qty,
    },
  };
}

export function deleteCartItem(id) {
  return {
    type: DELETE_CART_ITEM,
    payload: {
      id,
    },
  };
}

export function destroyCart() {
  return {
    type: DESTROY_CART,
  };
}



