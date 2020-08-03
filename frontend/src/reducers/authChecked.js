import { AUTH_CHECKED } from '../actions/types';

const authChecked = (state = false, action) => {
  switch (action.type) {
    case AUTH_CHECKED:
      return state = action.payload;
    default:
      return state
  }
}

export default authChecked;