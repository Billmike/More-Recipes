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
    * Adds a review to a recipe by an authenticated user
    *
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

        User.findById(req.userId)
          .then((foundUser) => {
            reviews.create({
              userId: req.userId,
              recipeId: req.params.recipeId,
              content: req.body.content,
              user: foundUser.dataValues.username
            }).then((review) => {
              User.findById(foundRecipe.owner)
                .then((user) => {
                  const mailOptions = {
                    from: process.env.EMAIL_ADDRESS,
                    to: user.email,
                    subject: 'Your recipe has been reviewed',
                    template: 'reviewsuccess',
                    context: {
                      username: user.username,
                      recipeId: req.params.id
                    }
                  };
                  sendMail.sendMail(mailOptions, (err) => {
                    if (err) {
                      return res.json({
                        message: err.message
                      });
                    }
                    return res.status(201).json({
                      message: 'Review successfully posted',
                      reviewData: {
                        content: review.content,
                        user: foundUser.username,
                        createdAt: review.createdAt,
                        updatedAt: review.updatedAt
                      }
                    });
                  });
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
