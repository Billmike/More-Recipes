import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

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
