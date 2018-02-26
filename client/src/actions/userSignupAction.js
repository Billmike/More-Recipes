import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import instance from '../utils/axios';
import { SET_CURRENT_USER } from './types';

/**
 * Represents a function
 * @function
 *
 * @param { object } user - The user object
 *
 * @returns { object } The action type and a user object
 */

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { object } userData - The user object
 *
 * @returns { object } The signed up user and a token
 */

export const signupRequest = userData => (dispatch) => {
  return instance.post('/users/signup', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('authToken', token);
      toastr.success('Login Successful.');
      dispatch(setCurrentUser(jwt.decode(token)));
    })
    .catch(error => Promise.reject(error.response.data.message));
};
