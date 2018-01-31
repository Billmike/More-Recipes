import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};

export const signinRequest = userData => (dispatch) => {
    console.log('--------- sending through user data object', userData);
    return axios.post("http://localhost:8000/api/v1/users/signin", userData)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('authToken', token);
        setAuthToken(token);
        dispatch(setCurrentUser(jwt.decode(token)))
      });
  };

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('authToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  }
}