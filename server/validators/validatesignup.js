/**
  * @returns { Object } validateSignup
  *
  *
  */

const validateSignup = ({ email, password, username }) => {
  if ((password === undefined || password === '') && (email === undefined || email === '') && (username === undefined || email === '')) return { valid: false, message: 'username, email and password fields are required', status: 400 };
  if (email === undefined || email === '') return { valid: false, message: 'Please enter an Email Address.', status: 400 };
  if (password === undefined || password.length <= 8 || password === '') return { valid: false, message: 'Password length must be greater than 8 characters, and can contain symbols for better security.', status: 400 };
  if (username === undefined || username === '') return { valid: false, message: 'Username is required', status: 400 };

  return { valid: true };
};

export default validateSignup;
