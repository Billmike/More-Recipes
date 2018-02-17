import db from '../models/index';

const Votes = db.Vote;
const Recipes = db.Recipe;

/**
 * Represents the VOte class
 *
 * @class
 */

class Vote {
  /**
  * Represents the method lets a user vote on a recipe
  * @method
  *
  * @param { object } req - The request object
  * @param { object } res - The response object
  *
  * @returns { object } Returns the vote of the user
  *
  */

  static voteRecipe(req, res) {
    if (req.params.vote !== 'downvote' && req.params.vote !== 'upvote') {
      return res
        .status(404).json({ status: 'Not Found.', message: 'URL not found.' });
    }
    Recipes.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res
            .status(404)
            .json({
              status: 'Not found.',
              message: 'This recipe does not exist. How \'bout you create one?'
            });
        }
        if (foundRecipe.owner === req.userId) {
          return res
            .status(403)
            .json({
              status: 'Forbidden.',
              message: 'You cannot vote on your own recipe.'
            });
        }
        return Votes.findAll({
          where: {
            recipeId: req.params.recipeId,
          },
        })
          .then((votedRecipes) => {
            if (votedRecipes.length === 0) {
              return Votes.create({
                userId: req.userId,
                recipeId: req.params.recipeId,
                voteType: req.params.vote,
              })
                .then(() => res
                  .status(200)
                  .json({
                    status: 'Success.',
                    message: `${req.params.vote} successful.`
                  }));
            }
            const votersArray = [];
            votedRecipes.filter(elem => votersArray
              .push(elem.dataValues.userId));

            if (votersArray.includes(req.userId)) {
              const checkVoteType = votedRecipes
                .filter(elem => elem.dataValues.userId === req.userId)[0];
              if (checkVoteType.dataValues.voteType === req.params.vote) {
                return res
                  .status(403)
                  .json({
                    status: 'Denied',
                    message: `You already ${req.params.vote}d on this recipe`
                  });
              }
              return Votes.findById(checkVoteType.dataValues.id)
                .then(updateVote => updateVote
                  .update({ voteType: req.params.vote }))
                .then(() => res
                  .status(200)
                  .json({
                    status: 'OK',
                    message: `${req.params.vote} successful.`
                  }));
            }
            return Votes.create({
              userId: req.userId,
              recipeId: req.params.recipeId,
              voteType: req.params.vote,
            })
              .then(() => res
                .status(200)
                .json({
                  status: 'OK',
                  message: `${req.params.vote} successful.`
                }));
          });
      })
      .catch(() => res
        .status(500)
        .json({
          message: 'Oops.. Something went wrong. Why not try again later?'
        }));
  }
}

export default Vote;
