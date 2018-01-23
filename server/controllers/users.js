import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models';
import signupValidator from '../validators/validatesignup';
import signinValidator from '../validators/validatesignin';


class Users {
  static signUp(req, res) {
    const { errors, valid } = signupValidator(req.body);
    if (!valid) {
      return res.status(400).json(errors);
    }
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({ status: 'Conflict', message: 'Email must be unique.' });
      }
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
        .then((newUser) => {
          const token = jwt.sign({ id: newUser.id }, process.env.SECRET, { expiresIn: '30 days' });
          return res.status(201).send({
            message: 'Signup Successful.',
            username: newUser.username,
            email: newUser.email,
            token,
          });
        })
        .catch((error) => {
          if (error.errors[0].message === 'username must be unique') {
            return res.status(409).json({ message: 'Username must unique.' });
          }
        });
    })
      .catch((error) => {
        return res.status(500).json(error.message);
      });
  }

  static signIn(req, res) {
    const { errors, valid } = signinValidator(req.body);
    if (!valid) {
      return res.status(400).json(errors);
    }
    if (valid) {
      const { email, password } = req.body;
      User.findOne({
        where: { email },
      }).then((user) => {
        if (!user) {
          return res.status(403).json({ status: 'Failed', message: 'Invalid email or password.' });
        }
        if (user) {
          const unHashPassword = bcrypt.compareSync(password, user.password);
          if (!unHashPassword) {
            return res.status(403).json({ status: 'Failed.', message: 'Invalid email or password.' });
          }
          const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '30 days' });
          return res.status(201).json({
            status: 'Success',
            message: 'Sign in Successfull',
            username: user.username,
            email: user.email,
            token,
          });
        }
      })
        .catch(err => res.status(500).json({ status: 'Server error', message: err.message }));
    }
  }
  static editProfile(req, res) {
    User.findById(req.userId)
      .then((user) => {
        if (user) {
          return user.update({
            email: req.body.email || user.email,
            password: req.body.password || user.password,
            username: req.body.username || user.username,
          })
            .then(updatedUser => res.status(200).json({ message: 'Update successful', email: updatedUser.email, username: updatedUser.username }))
            .catch(err => res.status(400).json({ status: 'An error occured', message: err.message }));
        }
      })
      .catch(err => res.status(500).json({ status: 'Server error', message: err.message }));
  }
}

export default Users;
