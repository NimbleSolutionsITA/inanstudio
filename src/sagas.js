/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { all } from 'redux-saga/effects';
import WpAuth from './providers/AuthProvider/saga';
import Woocommerce from './providers/WoocommerceDataProvider/saga';
import Wordpress from './providers/WordpressDataProvider/saga';

export default function* rootSaga() {
    yield all([Woocommerce(), Wordpress(), WpAuth()]);
}