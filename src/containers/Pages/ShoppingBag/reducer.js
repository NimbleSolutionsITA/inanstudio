/*
 *
 * Cart reducer
 *
 */
import produce from 'immer';

import { ADD_CART_ITEM, UPDATE_CART_ITEM, DELETE_CART_ITEM, DESTROY_CART } from '../../../constants';

const cachedCart = localStorage.getItem('nimble_localCart')
export const initialState = cachedCart ? JSON.parse(cachedCart) : []

function findPos(array, id) {
    return array.map(item => item.id).indexOf(id)
}

const CartReducer = () => (state = initialState, action) =>
  produce(state, draft => {
      switch (action.type) {
        case ADD_CART_ITEM: {
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
                'nimble_localCart',
                JSON.stringify(draft)
            )
            return draft;
        }
        case DELETE_CART_ITEM: {
            const pos = findPos(draft, action.payload.id)
            if (pos > -1) {
                draft.splice(pos, 1)
            } else {
                console.error('Item not in cart')
            }
            localStorage.setItem(
                'nimble_localCart',
                JSON.stringify(draft)
            )
            return draft;
        }
        case UPDATE_CART_ITEM: {
            const pos = findPos(draft, action.payload.id)
            if (pos > -1) {
                draft[pos] = {...draft[pos], qty: action.payload.qty }
            } else {
                console.error('Item not in cart')
            }
            localStorage.setItem(
                'nimble_localCart',
                JSON.stringify(draft)
            )
            return draft;
        }
          case DESTROY_CART: {
              localStorage.removeItem('nimble_localCart')
              return []
          }
        default: {
            return draft;
        }
    }
  })

export default CartReducer