import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../models';
import signupValidator from '../validators/validatesignup';
import signinValidator from '../validators/validatesignin';


require('dotenv').config();

class Users {
  static signUp(req, res, next) {
    const validateSignup = signupValidator(req.body);
    if (!validateSignup.valid) {
      const err = res.status(400).send({ message: validateSignup.message });
      return next(err);
    }
    const { email, password, username } = req.body;
    return User
      .create({
        email,
        password,
        username,
      })
      .then((user) => {
        const smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.PASSWORD,
          },
        });
        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: user.email,
          subject: 'Welcome to More-Recipes',
          text: 'A bouquet of amazing recipes awaits you. Begin your journey <a href="https://billmike.github.io">here</a>',
        };
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.log(err);
            res.status(400).send({ message: err.message });
          } else {
            console.log(`Sent message ${response.message}`);
            res.status(201).send({ status: 'sent', message: response.message });
          }
        });
        res.status(201).send({ status: 'Success', message: 'Sigup Successful!' });
      })
      .catch((error) => {
        if (error.errors[0].message === 'Validation isEmail on email failed') {
          res.status(400).send({
            message: 'Invalid email format. Email should be in the abc@xyz.com format.',
          });
        } else if (error.errors[0].message === 'username must be unique') {
          res.status(400).send({
            message: 'Username already taken.',
          });
        } else if (error.errors[0].message === 'email must be unique') {
          res.status(400).send({
            message: 'An account has been registered with this Email.',
          });
        }
      });
  }

  static signIn(req, res, next) {
    const validateSignin = signinValidator(req.body);
    if (validateSignin.valid) {
      const { email, password } = req.body;
      User.authenticate(email, password, (err, user) => {
        if (err === undefined || !user || err) {
          return res.status(403).send({
            status: 'Failed.',
            message: 'Invalid email or password.',
          });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '60 days' });
        return res.status(201).send({ status: 'Success', token: { token } });
      });
    } else {
      const err = res.status(400).send({ status: 'Failed.', message: validateSignin.message });
      return next(err);
    }
  }
}

export default Users;
