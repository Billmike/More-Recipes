import { isEmpty } from 'lodash';
/**
  * Represents the Signup Validator function
  * @function
  *
  * @param { object } data - The request data object
  *
  * @returns { object } The error object and isValid Boolean
  *
  */

const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateSignup = (data) => {
  const errors = {};
  if (data.email === undefined || data.email.trim() === ''
  || !validEmail.test(data.email)) {
    errors.email = 'Please provide a valid email address.';
  } if (data.password === undefined || data.password.length <= 8
    || data.password.trim() === '') {
    errors.password = 'Please provide a password greater than 8 characters.';
  } if (data.username === undefined || data.username.trim() === '') {
    errors.username = 'Username is required.';
  }
  return {
    errors,
    valid: isEmpty(errors),
  };
};

export default validateSignup;
