import jwt from 'jsonwebtoken';
import { User } from '../models';

require('dotenv').config();

/**
  * Represents the Session class
  *
  * @class
  */
class SessionControl {
  /**
  * Represents the method that checks a user
  *
  * @method
  *
  * @param { function } next Takes in a callback function
  * @param { object } req takes in the request object
  * @param { object } res takes in the response object
  *
  * @returns { object } - The user details
  */

  static isuser(req, res, next) {
    let verifiedJWT;
    try {
      verifiedJWT = jwt.verify(req.token, process.env.SECRET);
    } catch (error) {
      res
        .status(400)
        .json({
          status: 'failed.',
          message: 'Provide correct details to access this resource.'
        });
    }
    User.findById(verifiedJWT.id)
      .then((user) => {
        if (!user) {
          const err = res
            .status(403)
            .json({ status: 'Unverified.', message: 'Invalid user token.' });
          return next(err);
        }
        req.userId = verifiedJWT.id;
        return next();
      })
      .catch(() => res.status(500).json({
        message: 'Oops.. Something went wrong. Why not try again later?'
      }));
  }

  /**
   * Represents the method for getting a particular user's details
   *
   * @method
   *
   * @param { object } req - The request object
   * @param { object } res - The response object
   *
   * @returns { object } The user object
   *
   */

  static getUser(req, res) {
    req.token = req.headers.token || req.query.token;
    let verifiedJWT;
    try {
      verifiedJWT = jwt.verify(req.token, process.env.SECRET);
    } catch (error) {
      res
        .status(403)
        .json({ message: 'Provide correct details to access this resource.' });
    }
    User.findOne({
      where: {
        id: verifiedJWT.id,
      },
    })
      .then(user => res.send({
        email: user.email,
        username: user.username,
      }))
      .catch(() => res.status(500).json({
        message: 'Oops.. Something went wrong. Why not try again later?'
      }));
  }
}

export default SessionControl;
