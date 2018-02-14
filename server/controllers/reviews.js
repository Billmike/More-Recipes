import db from '../models/index';
import errorMessage from '../errorHandler/errorMessage';


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
            .json({ message: 'Recipe not found.' });
        }
        if (foundRecipe.owner === req.userId) {
          return res
            .status(403)
            .json({
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
              message: 'Review successfully posted',
              reviewData: {
                content: review.content
              }
            });
          })
          .catch(() => {
            return res
              .status(500)
              .json({
                message: errorMessage
              });
          });
      });
  }
}

export default Review;
