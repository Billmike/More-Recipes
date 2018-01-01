import db from '../models/index';


const reviews = db.Review;
const recipes = db.Recipe;
const Users = db.User;

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
    return recipes.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).send({ status: 'Not found.', message: 'Recipe not found.' });
        }
        if (foundRecipe.owner === req.userId) {
          return res.status(403).send({ status: 'Forbidden.', message: 'You cannot review your own recipe.' });
        }
        return reviews.create({
          userId: req.userId,
          recipeId: req.params.recipeId,
          content: req.body.content,
        })
          .then((review) => {
            return res.status(200).send({
              status: 'OK',
              message: 'Review successfully posted',
              review: review.content,
            });
          })
          .catch((error) => {
            return res.status(500).send({ message: error.message });
          });
      });
  }
}

export default Review;
