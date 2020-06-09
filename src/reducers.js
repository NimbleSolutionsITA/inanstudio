/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './history';
import WpAuthReducer from './providers/AuthProvider/reducer';
import WoocommerceDataReducer from './providers/WoocommerceDataProvider/reducer';
import WordpressDataReducer from './providers/WordpressDataProvider/reducer';
import HomeCoverReducer from './containers/Pages/Home/reducer';
import HeaderReducer from './containers/Header/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
    return combineReducers({
        router: connectRouter(history),
        user: WpAuthReducer(),
        woocommerce: WoocommerceDataReducer(),
        wordpress: WordpressDataReducer(),
        header: HeaderReducer(),
        homeCover: HomeCoverReducer(),
        ...injectedReducers,
    });
}
