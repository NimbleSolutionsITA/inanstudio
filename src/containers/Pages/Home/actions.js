/*
 *
 * HomeCovers actions
 *
 */
import { SET_CURRENT_COVER, TOGGLE_SHOW_CONTENT } from '../../../constants';

export function setCurrentCover(index, color, colorMobile, title, ctaText, ctaLink) {
  return {
    type: SET_CURRENT_COVER,
    payload: {
      index,
      color,
      colorMobile,
      title,
      ctaText,
      ctaLink,
    },
  };
}
export function toggleShowContent(showContent) {
  return {
    type: TOGGLE_SHOW_CONTENT,
    payload: {
      showContent,
    },
  };
}
