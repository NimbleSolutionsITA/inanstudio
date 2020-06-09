/*
 *
 * HomeCover reducer
 *
 */
import produce from 'immer';

import { SET_CURRENT_COVER, TOGGLE_SHOW_CONTENT } from '../../../constants';

export const initialState = {
    index: 0,
    title: '',
    ctaText: '',
    ctaLink: '',
    showContent: true,
};

/* eslint-disable default-case, no-param-reassign */
const HomeCoverReducer = () => (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_CURRENT_COVER:
                Object.assign(draft, {
                    index: action.payload.index,
                    title: action.payload.title,
                    ctaText: action.payload.ctaText,
                    ctaLink: action.payload.ctaLink,
                });
                break;
            case TOGGLE_SHOW_CONTENT:
                Object.assign(draft, {
                    showContent: action.payload.showContent,
                });
                break;
        }
    });

export default HomeCoverReducer;