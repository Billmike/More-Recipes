/**
  * @returns { Object } validatesignin
  *
  *
  */

const validatesignin = ({ email, password }) => {
  if (email === undefined || email === '') return { valid: false, message: 'Email is required.', status: 400 };
  if (password === undefined || password === '') return { valid: false, message: 'Password is required.', status: 400 };
  return { valid: true };
};

export default validatesignin;
