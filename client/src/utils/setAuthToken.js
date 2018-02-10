import axios from 'axios';

/**
 * Represents a function
 * @function
 *
 * @param { string } token - The jwt token coming from the server
 *
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export default setAuthToken;
