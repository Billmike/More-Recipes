import jwt from 'jsonwebtoken';
import { User } from '../models';

const secret = 'secretkeyishere';

/**
  * @class { Object } SessionControl
  *
  *
  */
class SessionControl {
  /**
  * @param { Callback } next Takes in a callback function
  *@param { String } req takes in the request
  *@param { String } res takes in the response
  */
  static isuser(req, res, next) {
    let verifiedJWT;
    try {
      verifiedJWT = jwt.verify(req.token, secret);
    } catch (error) {
      res.status(400).send({ status: 'failed.', message: 'Provide correct details to access this resource.' });
    }
    User.findById(verifiedJWT.id)
      .then((user) => {
        if (!user) {
          const err = res.status(403).send({ status: 'Unverified.', message: 'Invalid user token.' });
          return next(err);
        }
        req.userId = verifiedJWT.id;
        return next();
      })
      .catch(e => res.status(400).send({ status: 'Unknown Error.', message: e.message }));
  }
}

export default SessionControl;