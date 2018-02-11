import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';
import '../utils/toastrConfig';

/**
 * Represents a function
 * @function
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
 * Represents a function
 * @function
 *
 * @param { object } userData - The user object
 *
 * @returns { object } The signed up user and a token
 */

export const signupRequest = userData => dispatch => axios
  .post('/api/v1/users/signup', userData)
  .then((res) => {
    const { token } = res.data;
    localStorage.setItem('authToken', token);
    toastr.success('Login Successful.');
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  })
  .catch(error => Promise.reject(error.response.data.message));
