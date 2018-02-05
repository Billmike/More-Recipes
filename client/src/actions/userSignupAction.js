import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};

export const signupRequest = userData => (dispatch) => {
    console.log('--------- sending through user data object', userData);
    return axios.post("http://localhost:8000/api/v1/users/signup", userData)
      .then((res) => {
        console.log('?????????', res)
      const { token } = res.data;
      localStorage.setItem('authToken', token);
      toastr.success('Login Successful.');
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      });
  };
