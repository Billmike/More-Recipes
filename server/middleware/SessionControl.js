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
  * Check and verify the token passed
  *
  * @param { function } next Takes in a callback function
  * @param { object } req takes in the request object
  * @param { object } res takes in the response object
  *
  * @returns { object } - The user details object
  */

  static isUser(req, res, next) {
    let verifiedJWT;
    try {
      verifiedJWT = jwt.verify(req.token, process.env.SECRET);
    } catch (error) {
      res
        .status(403)
        .json({
          message: 'You need to be logged in to perform this action.'
        });
    }
    User.findById(verifiedJWT.id)
      .then((user) => {
        if (!user) {
          const err = res
            .status(403)
            .json({ message: 'Invalid user token.' });
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
   * Fetch the details of a signed-in user
   *
   *
   * @param { object } req - The request object
   * @param { object } res - The response object
   *
   * @returns { object } The user object
   *
   */

  static getUser(req, res) {
    req.token = req.headers['x-access-token']
      || req.headers.token || req.query.token;
    let verifiedJWT;
    try {
      verifiedJWT = jwt.verify(req.token, process.env.SECRET);
    } catch (error) {
      res
        .status(401)
        .json({ message: 'Provide correct details to access this resource.' });
    }
    User.findOne({
      where: {
        id: verifiedJWT.id,
      },
    })
      .then(user => res.status(200).json({
        id: user.id,
        email: user.email,
        username: user.username,
      }))
      .catch(() => res.status(500).json({
        message: 'Oops.. Something went wrong. Why not try again later?'
      }));
  }
}

export default SessionControl;
