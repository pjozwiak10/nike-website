import { SET_WINDOW_SIZE } from './types';

export const setWindowSize = (windowSize) => ({
  type: SET_WINDOW_SIZE,
  payload: windowSize,
})