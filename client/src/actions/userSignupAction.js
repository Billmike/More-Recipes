import axios from "axios";

export const signupRequest = userData => {
  return dispatch => {
    return axios.post("http://localhost:8000/api/v1/users/signup", userData);
  };
};
