import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import instance from '../utils/axios';
import { SIGNUP_REQUEST } from './types';
import { setCurrentUser } from './signinRequest';

const signupRequestAction = () => ({
  type: SIGNUP_REQUEST,
  isLoading: true
});

/**
 * Represents a function
 * @function
 *
 * @param { object } userData - The user object
 *
 * @returns { object } The signed up user and a token
 */

// eslint-disable-next-line
export const signupRequest = userData => (dispatch) => {
  dispatch(signupRequestAction());
  return instance.post('/users/signup', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('authToken', token);
      toastr.success('Login Successful.');
      dispatch(setCurrentUser(jwt.decode(token)));
    })
    .catch(error => error);
};
