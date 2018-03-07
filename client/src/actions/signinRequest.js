import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, GET_USER_INFORMATION } from './types';
import instance from '../utils/axios';
import '../utils/toastrConfig';

/**
 * Action creator to set the current user in the store
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
 * Action creator to set fetch the user in the store
 *
 * @param { object } user - The user object
 *
 * @returns { object } The action type and a user object
 */

export const getUserInformationActionCreator = (user) => {
  return {
    type: GET_USER_INFORMATION,
    user
  };
};

/**
 * Action to set the current user in the store
 *
 * @param { object } user - The user object
 *
 * @returns { object } The action type and a user object
 */

export const getUserinfo = () => {
  return (dispatch) => {
    return instance.get('/users/get_user')
      .then((response) => {
        dispatch(getUserInformationActionCreator(response.data));
      })
      .catch((err) => {
        Promise.reject(err);
      });
  };
};

/**
 * Action to sign-in a user
 *
 * @param { object } userData - The user object
 *
 * @returns { object } The signed in user and a token
 */
export const signinRequest = userData => (dispatch) => {
  return instance.post('/users/signin', userData)
    .then((response) => {
      const { token } = response.data;
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
 * Action to log a user out of the application
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
