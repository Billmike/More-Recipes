import db from '../models/index';

const reviews = db.Review;
const recipes = db.Recipe;

/**
  * @class { Object } Review
  *
  *
  */

class Review {
/**
  * @returns { Object } addRecipe
  *@param { String } req takes in the request
  *@param { String } res takes in the response
  */

  static addReviews(req, res) {
    return recipes
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ status: 'Not found.', message: 'The recipe you are looking for does not exist.' });
        }
        return reviews
          .create({
            content: req.body.content,
            recipeId: req.params.recipeId,
            userId: req.userId,
          })
          .then(review => res.status(200).send({ status: 'Success.', data: review }))
          .catch(error => res.status(400).send({ status: 'Failed.', message: error.message }));
      })
      .catch(error => res.status(400).send({ status: 'Something went wrong.', message: error.message }));
  }
}

export default Review;
