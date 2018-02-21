import db from '../models/index';
import sendMail from './sendMail';
import errorMessage from '../errorHandler/errorMessage';

const { User } = db;
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
        User.findById(foundRecipe.owner)
          .then((user) => {
            reviews.create({
              userId: req.userId,
              recipeId: req.params.recipeId,
              content: req.body.content,
            }).then((review) => {
              const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: user.email,
                subject: `Hi ${user.username}. Your recipe has been reviewed`
              };
              sendMail.sendMail(mailOptions, (err) => {
                if (err) {
                  return res.json({
                    message: err.message
                  });
                }
              });
              return res.status(201).json({
                message: 'Review successfully posted',
                reviewData: {
                  content: review.content
                }
              });
            });
          });
      }).catch(() => {
        return res
          .status(500)
          .json({
            message: errorMessage
          });
      });
  }
}

export default Review;
