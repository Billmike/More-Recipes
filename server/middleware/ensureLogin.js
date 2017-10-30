class ProperLogin {
  static ensureLogin(req, res, next) {
    req.token = req.body.token || req.headers.token || req.query.token;
    if (!req.token) {
      return res.status(403).send({ status: 'Denied', message: 'You need to be logged in to perform this action.' });
    }
    return next();
  }
}

export default ProperLogin;
