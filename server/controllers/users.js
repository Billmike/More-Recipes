import { User } from '../models';
import signupValidator from '../validators/validatesignup';

class Users {
  static signUp(req, res, next) {
    const validateSignup = signupValidator(req.body);
    if (!validateSignup.valid) {
      const err = new Error(validateSignup.message);
      err.status = validateSignup.status;
      next(err);
    }
    const { email, password, username } = req.body;
    return User
      .create({
        email,
        password,
        username,
      })
      .then(() => res.status(201).send({ status: 'Success', message: 'Sigup Successful!' }))
      .catch((error) => {
        const err = new Error(error.errors[0].message);
        err.status = 400;
        return next(err);
      });
  }
}

export default Users;
