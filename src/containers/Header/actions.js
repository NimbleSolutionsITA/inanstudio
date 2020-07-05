/*
 *
 * HomeCovers actions
 *
 */
import { SET_HEADER_HEIGHT, SET_HEADER_COLOR, OPEN_DRAWER } from '../../constants';

export function setHeaderHeight(height) {
  return {
    type: SET_HEADER_HEIGHT,
    payload: {
      height,
    },
  };
}
export function setHeaderColor(headerColor, headerColorMobile) {
  return {
    type: SET_HEADER_COLOR,
    payload: {
      color: headerColor,
      colorMobile: headerColorMobile,
    },
  };
}
export function openDrawer(open) {
  return {
    type: OPEN_DRAWER,
    payload: {
      open,
    },
  };
}