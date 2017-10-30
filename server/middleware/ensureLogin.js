class ProperLogin {
  static ensureLogin(req, res, next) {
    req.token = req.body.token || req.headers.token;
    if (!req.token) {
      return res.status(403).send({ status: 'Denied', message: 'You need to be logged in to create recipes.' });
    }
    return next();
  }
}

export default ProperLogin;
