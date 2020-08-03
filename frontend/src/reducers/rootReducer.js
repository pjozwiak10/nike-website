import { combineReducers } from 'redux';
import windowSize from './windowSize';
import cart from './cart';
import user from './user';
import authChecked from './authChecked';

const rootReducer = combineReducers({
  windowSize,
  cart,
  user,
  authChecked,
});

export default rootReducer;