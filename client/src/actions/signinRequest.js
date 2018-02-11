import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import '../utils/toastrConfig';

/**
 *  Action to set the state of a user
 *
 * @param { object } user - The user object
 *
 * @returns { object } The action type and a user object
 */

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 * Sign in a registered user
 *
 * @param { object } userData - The user object
 *
 * @returns { object } The signed in user and a token
 */
export const signinRequest = userData => dispatch =>
  axios
    .post('/api/v1/users/signin', userData)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      toastr.success('Login Successful.');
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
    .catch(error => Promise.reject(error.response.data.message));

/**
 * Logs out the user
 *
 * @returns { object } An empty object representing a signed out user
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('authToken');
  toastr.success('Logout Successful.');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
