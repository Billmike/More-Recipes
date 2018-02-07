import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, GET_USER_INFORMATION } from './types';
import setAuthToken from '../utils/setAuthToken';
import './toastrConfig';

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};

// export const getUserInformation = (user) => {
//   return {
//     type: GET_USER_INFORMATION,
//     user,
//   };
// };

export const signinRequest = userData => (dispatch) => {
  return axios.post('/api/v1/users/signin', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('authToken', token);
      toastr.success('Login Successful.');
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
    .catch(error => Promise.reject(error.response.data.message));
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('authToken');
    toastr.success('Logout Successful.');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
};

// export const startGetUserInfo = () => {
//   return (dispatch) => {
//     axios.get('http://localhost:8000/api/v1/users/get_user')
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };
