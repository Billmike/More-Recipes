/**
  * Represents the class that ensures a user is logged in
  * @class
  *
  */

class IsLoggedIn {
  /**
    * Represents the method that checks if a use has a token
    * @method
    *
    * @param { object } req - The request object
    * @param { object } res - The response object
    * @param { function }next - Callback function
    *
    * @returns { object } A token with the userId
    */

  static hasToken(req, res, next) {
    req.token = req.headers.token || req.query.token;
    if (!req.token) {
      return res
        .status(403)
        .send({
          status: 'Denied',
          message: 'You need to be logged in to perform this action.'
        });
    }
    return next();
  }
}

export default IsLoggedIn;
