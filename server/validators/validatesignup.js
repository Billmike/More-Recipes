const validateSignup = ({ email, password, username }) => {
  if (password === undefined && email === undefined) return { valid: false, message: 'email and password fields are required', status: 400 };
  if (email === undefined || email === '') return { valid: false, message: 'Please enter an Email Address.', status: 400 };
  if (password === undefined || password.length <= 8) return { valid: false, message: 'Please enter a secured password', status: 400 };
  if (username === undefined || username === '') return { valid: false, message: 'Username is required', status: 400 };

  return { valid: true };
};

export default validateSignup;
