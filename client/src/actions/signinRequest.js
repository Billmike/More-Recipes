import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, GET_USER_INFORMATION } from './types';
import setAuthToken from '../utils/setAuthToken';
import instance from '../utils/axios';
import './toastrConfig';

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

export const getUserInformationAC = (user) => {
  return {
    type: GET_USER_INFORMATION,
    user
  };
};

export const getUserinfo = () => {
  return (dispatch) => {
    return instance.get('/users/get_user')
      .then((res) => {
        dispatch(getUserInformationAC(res.data))
      })
      .catch((err) => {
        Promise.reject(err);
      });
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { object } userData - The user object
 *
 * @returns { object } The signed in user and a token
 */
export const signinRequest = userData => (dispatch) => {
  return instance.post('/users/signin', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('authToken', token);
      toastr.success('Login Successful.');
      dispatch(setCurrentUser(jwt.decode(token)));
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
      Promise.reject(error);
    });
};

/**
 * Represents a function
 * @function
 *
 * @returns { object } An empty object representing a signed out user
 */
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('authToken');
    toastr.success('Logout Successful.');
    dispatch(setCurrentUser({}));
  };
};
