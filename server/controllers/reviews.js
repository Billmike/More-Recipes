import db from '../models/index';


const reviews = db.Review;
const recipes = db.Recipe;

/**
  * Represents the Review class
  *
  * @class
  */

class Review {
/**
  * Represents the method that adds a review
  * @method
  *
  * @param { object } req - The request object
  * @param { object } res - The response object
  *
  * @returns { object } Returns the review object
  *
  */

  static addReviews(req, res) {
    return recipes.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res
            .status(404)
            .json({ status: 'Not found.', message: 'Recipe not found.' });
        }
        if (foundRecipe.owner === req.userId) {
          return res
            .status(403)
            .json({
              status: 'Forbidden.',
              message: 'You cannot review your own recipe.'
            });
        }
        return reviews.create({
          userId: req.userId,
          recipeId: req.params.recipeId,
          content: req.body.content,
        })
          .then((review) => {
            return res.status(201).json({
              status: 'OK',
              message: 'Review successfully posted',
              reviewData: review.content,
            });
          })
          .catch(() => {
            return res
              .status(500)
              .json({
                message: 'Oops.. Something went wrong. Why not try again later?'
              });
          });
      });
  }
}

export default Review;
