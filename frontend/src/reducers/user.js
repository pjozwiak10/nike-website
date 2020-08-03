import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, AUTH_SUCCESS, AUTH_ERROR } from '../actions/types';

const initialState = {
  _id: null,
  name: null,
  email: null,
  registerDate: null,
  isAuthenticated: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
      const { user } = action.payload;
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        registerDate: user.registerDate,
        isAuthenticated: true
      }
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      return {
        _id: null,
        name: null,
        email: null,
        registerDate: null,
        isAuthenticated: null,
      }
    default:
      return state;
  }
}

export default user;