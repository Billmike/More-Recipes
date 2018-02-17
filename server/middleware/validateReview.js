/**
  * Represents the add review validator function
  * @function
  *
  * @param { object } req - The request object
  * @param { object } res - The response object
  * @param { callback } next - The callback function
  *
  * @returns { object } an object of user reviews
  */

const validateReview = (req, res, next) => {
  const { content } = req.body;
  if (content === undefined || content.trim() === '') {
    const err = res
      .status(403)
      .send({
        status: 'Denied.',
        message: 'You can\'t post an empty review. Please, enter a happy review for this recipe.'
      });
    return next(err);
  }
  return next();
};

export default validateReview;

