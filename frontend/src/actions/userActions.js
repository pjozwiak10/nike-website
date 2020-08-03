import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, AUTH_SUCCESS, AUTH_ERROR, AUTH_CHECKED } from '../actions/types';
import axios from 'axios';

export const login = (loginData) => {
  if (loginData.user) return { type: LOGIN_SUCCESS, payload: loginData }
  else return { type: LOGIN_FAIL, payload: loginData }
}

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/users/logout', { withCredentials: true });
    dispatch({ type: LOGOUT, payload: response.data });
  } catch (err) {
    throw err;
  }
}

export const authUser = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/users', { withCredentials: true });
    dispatch({ type: AUTH_SUCCESS, payload: response.data });
    dispatch({ type: AUTH_CHECKED, payload: true });
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.response.data });
    dispatch({ type: AUTH_CHECKED, payload: true });
  }
}

