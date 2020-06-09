/*
 *
 * Header reducer
 *
 */
import produce from 'immer';
import {SET_CURRENT_COVER,SET_HEADER_HEIGHT, OPEN_DRAWER, SET_HEADER_COLOR} from "../../constants";

export const initialState = {
    headerColor: '#000',
    headerColorMobile: '#000',
    open: false,
    height: 70,
};

const HeaderReducer = () => (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_CURRENT_COVER:
            case SET_HEADER_COLOR:
                Object.assign(draft, {
                    headerColor: action.payload.color,
                    headerColorMobile: action.payload.colorMobile || action.payload.color,
                });
                break;
            case SET_HEADER_HEIGHT:
                Object.assign(draft, {
                    height: action.payload.height,
                });
                break;
            case OPEN_DRAWER:
                Object.assign(draft, {
                    open: action.payload.open,
                });
                break;
            default:
                return;
        }
    });

export default HeaderReducer;