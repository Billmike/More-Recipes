import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models';
import errorMessage from '../errorHandler/errorMessage';
import signupValidator from '../validators/validatesignup';
import signinValidator from '../validators/validatesignin';

/**
 * Represents the User class
 * @class
 */

class Users {
  /**
   * Represents the static method for signing up a user
   * @method
   *
   * @param { object } req - The request Object
   * @param { object } res - The response Object
   *
   * @returns { object } The signed up user
   */

  static signUp(req, res) {
    const { errors, valid } = signupValidator(req.body);
    if (!valid) {
      return res.status(400).json(errors);
    }
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(409).json({ message: 'Email must be unique.' });
        }
        User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })
          .then((newUser) => {
            const token = jwt.sign(
              {
                id: newUser.id,
                username: newUser.username,
                emailAddress: newUser.email
              },
              process.env.SECRET,
              { expiresIn: '30 days' }
            );
            return res.status(201).json({
              message: 'Signup Successful.',
              username: newUser.username,
              email: newUser.email,
              token
            });
          })
          .catch((error) => {
            if (error.errors[0].message === 'username must be unique') {
              return res
                .status(409)
                .json({ message: 'Username must be unique.' });
            }
          });
      })
      .catch(() =>
        res.status(500).json({
          message: errorMessage
        }));
  }

  /**
   * Represents the static method for signing in a user
   * @method
   *
   * @param { object } req - The request Object
   * @param { object } res - The response Object
   *
   * @returns { object } The signed in user
   */

  static signIn(req, res) {
    const { errors, valid } = signinValidator(req.body);
    if (!valid) {
      return res.status(400).json(errors);
    }
    if (valid) {
      const { email, password } = req.body;
      User.findOne({
        where: { email }
      })
        .then((user) => {
          if (!user) {
            return res
              .status(401)
              .json({ message: 'Invalid email or password.' });
          }
          if (user) {
            const unHashPassword = bcrypt.compareSync(password, user.password);
            if (!unHashPassword) {
              return res.status(401).json({
                message: 'Invalid email or password.'
              });
            }
            const token = jwt.sign(
              {
                id: user.id,
                username: user.username,
                emailAddress: user.email
              },
              process.env.SECRET,
              { expiresIn: '30 days' }
            );
            return res.status(201).json({
              message: 'Sign in Successfull',
              username: user.username,
              email: user.email,
              token
            });
          }
        })
        .catch(() =>
          res.status(500).json({
            message: errorMessage
          }));
    }
  }
}

export default Users;
