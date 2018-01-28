import axios from 'axios';

export const signupRequest = userData => (dispatch) => {
    console.log('--------- sending through user data object', userData);
    return axios.post("http://localhost:8000/api/v1/users/signup", userData);
  };
