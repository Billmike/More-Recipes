const validateReview = (req, res, next) => {
  const { content } = req.body;
  if (content === undefined || content === '') {
    const err = res.status(403).send({ status: 'Denied.', message: 'You can\'t post an empty review. Please, enter a happy review for this recipe.' });
    return next(err);
  }
  return next();
};

export default validateReview;

