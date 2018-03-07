/**
  * Represents the class that ensures a user is logged in
  * @class
  *
  */

class IsLoggedIn {
  /**
    * Verify whether a token is passed in the request
    *
    *
    * @param { object } req - The request object
    * @param { object } res - The response object
    * @param { function }next - Callback function
    *
    * @returns { object } A token with the userId
    */

  static hasToken(req, res, next) {
    req.token = req.headers['x-access-token']
      || req.headers.token || req.query.token;
    if (!req.token) {
      return res
        .status(401)
        .send({
          message: 'You need to be logged in to perform this action.'
        });
    }
    return next();
  }
}

export default IsLoggedIn;
