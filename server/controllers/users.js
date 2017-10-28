import jwt from 'jsonwebtoken';
import { User } from '../models';
import signupValidator from '../validators/validatesignup';
import signinValidator from '../validators/validatesignin';

const secret = 'secretkeyishere';

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

  static signIn(req, res, next) {
    const validateSignin = signinValidator(req.body);
    if (validateSignin.valid) {
      const { email, password } = req.body;
      User.authenticate(email, password, (err, user) => {
        if (err === undefined || !user || err) {
          const err2 = new Error('Invalid email or password.');
          err2.status = 401;
          next(err2);
        }
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '60 days' });
        return res.status(201).send({ status: 'Success', token: { token } });
      });
    } else {
      const err = new Error(validateSignin.message);
      err.status = validateSignin.status;
      next(err);
    }
  }
}

export default Users;
