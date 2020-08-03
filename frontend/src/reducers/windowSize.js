import { SET_WINDOW_SIZE } from '../actions/types';

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const windowSize = (state = initialState, action) => {
  switch (action.type) {
    case SET_WINDOW_SIZE:
      const { width, height } = action.payload;
      return state = { width, height }
    default:
      return state;
  }
}

export default windowSize;



