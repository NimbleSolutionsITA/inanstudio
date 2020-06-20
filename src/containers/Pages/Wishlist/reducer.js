/*
 *
 * Wishlist reducer
 *
 */
import produce from 'immer';

import { ADD_WISHLIST_ITEM, UPDATE_WISHLIST_ITEM, DELETE_WISHLIST_ITEM, DESTROY_WISHLIST } from '../../../constants';

const cachedWishlist = localStorage.getItem('nimble_localWishlist')
export const initialState = cachedWishlist ? JSON.parse(cachedWishlist) : []

function findPos(array, id) {
    return array.map(item => item.id).indexOf(id)
}

const WishlistReducer = () => (state = initialState, action) =>
  produce(state, draft => {
      switch (action.type) {
        case ADD_WISHLIST_ITEM: {
            const pos = findPos(draft, action.payload.id)
            if (pos > -1) {
                draft[pos] = {
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    leather: action.payload.leather,
                    size: action.payload.size,
                    color: action.payload.color,
                    image: action.payload.image,
                    slug: action.payload.slug,
                    qty: action.payload.qty + draft[pos].qty
                }
            } else {
                draft.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    leather: action.payload.leather,
                    size: action.payload.size,
                    color: action.payload.color,
                    image: action.payload.image,
                    slug: action.payload.slug,
                    qty: action.payload.qty
                })
            }
            localStorage.setItem(
                'nimble_localWishlist',
                JSON.stringify(draft)
            )
            return draft;
        }
        case DELETE_WISHLIST_ITEM: {
            const pos = findPos(draft, action.payload.id)
            if (pos > -1) {
                draft.splice(pos, 1)
            } else {
                console.error('Item not in whishlist')
            }
            localStorage.setItem(
                'nimble_localWishlist',
                JSON.stringify(draft)
            )
            return draft;
        }
        case UPDATE_WISHLIST_ITEM: {
            const pos = findPos(draft, action.payload.id)
            if (pos > -1) {
                draft[pos] = {...draft[pos], id: action.payload.id, qty: action.payload.qty }
            } else {
                console.error('Item not in cart')
            }
            localStorage.setItem(
                'nimble_localWishlist',
                JSON.stringify(draft)
            )
            return draft;
        }
          case DESTROY_WISHLIST: {
              localStorage.removeItem('nimble_localWishlist')
              return []
          }
        default: {
            return draft;
        }
    }
  })

export default WishlistReducer