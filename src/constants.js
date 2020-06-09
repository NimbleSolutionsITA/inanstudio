/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'angostura/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'angostura/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const baseUrl = 'https://wp.inanstudio.com/';
export const woocommerceVersion = 'wc/v3';
export const woocommerceKey = 'ck_7c64fb75363e97bc5a5b517e1584f041b23623c3';
export const woocommerceSecret = 'cs_7896b3337a5676d23fdad1346683a983c26c99e2';

export const FETCH_WOOCOMMERCE_DATA = 'WoocommerceDataProvider/FETCH_DATA';
export const SET_WOOCOMMERCE_DATA = 'WoocommerceDataProvider/SET_DATA';
export const FETCH_WORDPRESS_DATA = 'WordpressDataProvider/FETCH_DATA';
export const SET_WORDPRESS_DATA = 'WordpressDataProvider/SET_DATA';

export const SET_CURRENT_COVER = 'HomeCover/SET_CURRENT_COVER';
export const TOGGLE_SHOW_CONTENT = 'HomeCover/TOGGLE_SHOW_CONTENT';

export const SET_HEADER_COLOR = 'Header/SET_HEADER_COLOR';
export const SET_HEADER_HEIGHT = 'Header/SET_HEADER_HEIGHT';
export const OPEN_DRAWER = 'Header/OPEN_DRAWER';

export const CHECK_LOGIN = 'AuthProvider/CHECK_LOGIN';
export const LOGIN = 'AuthProvider/LOGIN';
export const LOGOUT = 'AuthProvider/LOGOUT';
export const SET_USER_DATA = 'AuthProvider/SET_USER_DATA';
