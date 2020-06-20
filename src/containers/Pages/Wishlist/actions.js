/*
 *
 * Wishlist actions
 *
 */

import { DELETE_WISHLIST_ITEM, ADD_WISHLIST_ITEM, UPDATE_WISHLIST_ITEM, DESTROY_WISHLIST } from '../../../constants';


export function addWishlistItem(id, name, price, leather, size, color, image, slug, qty) {
  return {
    type: ADD_WISHLIST_ITEM,
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

export function updateWishlistItem(id, qty) {
  return {
    type: UPDATE_WISHLIST_ITEM,
    payload: {
      id,
      qty,
    },
  };
}

export function deleteWishlistItem(id) {
  return {
    type: DELETE_WISHLIST_ITEM,
    payload: {
      id,
    },
  };
}

export function destroyWishlist() {
  return {
    type: DESTROY_WISHLIST,
  };
}



