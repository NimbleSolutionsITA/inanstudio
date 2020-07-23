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

export const FETCH_WORDPRESS_DATA = 'WordpressDataProvider/FETCH_DATA';
export const SET_WORDPRESS_DATA = 'WordpressDataProvider/SET_DATA';

export const FETCH_WOOCOMMERCE_DATA = 'WoocommerceDataProvider/FETCH_DATA';
export const SET_WOOCOMMERCE_DATA = 'WoocommerceDataProvider/SET_DATA';
export const CREATE_WOOCOMMERCE_CUSTOMER = 'WoocommerceDataProvider/CREATE_CUSTOMER';
export const SET_WOOCOMMERCE_CUSTOMER_RESPONSE = 'WoocommerceDataProvider/SET_CUSTOMER_RESPONSE';
export const UPDATE_WOOCOMMERCE_CUSTOMER = 'WoocommerceDataProvider/UPDATE_CUSTOMER';
export const CREATE_WOOCOMMERCE_ORDER = 'WoocommerceDataProvider/CREATE_ORDER';
export const UPDATE_WOOCOMMERCE_ORDER = 'WoocommerceDataProvider/UPDATE_ORDER';
export const DELETE_WOOCOMMERCE_ORDER = 'WoocommerceDataProvider/DELETE_WOOCOMMERCE_ORDER';
export const SET_WOOCOMMERCE_ORDER_RESPONSE = 'WoocommerceDataProvider/SET_WOOCOMMERCE_ORDER_RESPONSE';

export const ADD_CART_ITEM = 'Cart/ADD_CART_ITEM';
export const UPDATE_CART_ITEM = 'Cart/UPDATE_CART_ITEM';
export const DELETE_CART_ITEM = 'Cart/DELETE_CART_ITEM';
export const DESTROY_CART = 'Cart/DESTROY_CART';

export const ADD_WISHLIST_ITEM = 'Wishlist/ADD_WISHLIST_ITEM';
export const UPDATE_WISHLIST_ITEM = 'Wishlist/UPDATE_WISHLIST_ITEM';
export const DELETE_WISHLIST_ITEM = 'Wishlist/DELETE_WISHLIST_ITEM';
export const DESTROY_WISHLIST = 'Wishlist/DESTROY_WISHLIST';

export const SET_CURRENT_COVER = 'HomeCover/SET_CURRENT_COVER';
export const TOGGLE_SHOW_CONTENT = 'HomeCover/TOGGLE_SHOW_CONTENT';

export const SET_HEADER_COLOR = 'Header/SET_HEADER_COLOR';
export const SET_HEADER_HEIGHT = 'Header/SET_HEADER_HEIGHT';
export const OPEN_DRAWER = 'Header/OPEN_DRAWER';
export const OPEN_SIZE_GUIDE = 'Header/OPEN_SIZE_GUIDE';

export const CHECK_LOGIN = 'AuthProvider/CHECK_LOGIN';
export const LOGIN = 'AuthProvider/LOGIN';
export const LOGOUT = 'AuthProvider/LOGOUT';
export const SET_USER_DATA = 'AuthProvider/SET_USER_DATA';
export const SET_LOGIN_FAILED = 'AuthProvider/SET_LOGIN_FAILED';
export const SET_USER_INFO = 'AuthProvider/SET_USER_INFO';
export const SET_AUTHENTICATED = 'AuthProvider/SET_AUTHENTICATED';

export const WCHeaders = () => {
    const myHeaders = new Headers();
    const encodedData = window.btoa(process.env.REACT_APP_WOOCOMMERCE_CLIENT + ':' + process.env.REACT_APP_WOOCOMMERCE_SECRET);
    const authorizationHeaderString = 'Basic ' + encodedData;
    myHeaders.append("Authorization", authorizationHeaderString);
    myHeaders.append("Content-Type", 'application/json')
    return myHeaders
}