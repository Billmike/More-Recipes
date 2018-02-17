import db from '../models/index';
import errorMessage from '../errorHandler/errorMessage';

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

  static newVote(req, res) {
    Recipes.findById(req.params.recipeId)
      .then((foundRecipe) => {
        const { userId } = req;
        console.log('The array', userId)
        if (req.params.vote === 'upvote') {
          foundRecipe.upvoters.push(userId);
          console.log('The second array', foundRecipe.upvoters);
          return Votes.create({
            userId: req.userId,
            recipeId: req.params.recipeId,
            voteType: req.params.vote
          }).then((votedRec) => {
            res.status(200).json({
              message: 'Successfully upvoted'
            });
          });
        }
        foundRecipe.downvoters.push(req.userId);
        return Votes.create({
          userId: req.userId,
          recipeId: req.params.recipeId,
          voteType: req.params.vote
        }).then((votedRec) => {
          res.status(200).json({
            message: 'Successfully downvoted'
          });
        });
      }).catch((error) => {
        res.status(500).json({
          message: error.message
        })
      })
  }

  static voteRecipe(req, res) {
    if (req.params.vote !== 'downvote' && req.params.vote !== 'upvote') {
      return res
        .status(404).json({ message: 'URL not found.' });
    }
    Recipes.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res
            .status(404)
            .json({
              message: 'This recipe does not exist. How \'bout you create one?'
            });
        }
        if (foundRecipe.owner === req.userId) {
          return res
            .status(403)
            .json({
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
                .then(votedRecipe => res
                  .status(200)
                  .json({
                    message: `${req.params.vote} successful.`,
                    votedRecipe: {
                      recipeId: votedRecipe.recipeId
                    }
                  }));
            }
            
            const votersArray = [];
            votedRecipes.forEach(elem => votersArray
              .push(elem.dataValues.userId));

            if (votersArray.includes(req.userId)) {
              const checkVoteType = votedRecipes
                .filter(elem => elem.dataValues.userId === req.userId)[0];
              if (checkVoteType.dataValues.voteType === req.params.vote) {
                res
                  .status(200)
                  .json({
                    message: `Recipe removed from your list of ${req.params.vote}d recipes`,
                    votedRecipe: {
                      recipeId: checkVoteType.dataValues.recipeId
                    }
                  });
                return checkVoteType.destroy();
              }
              return Votes.findById(checkVoteType.dataValues.id)
                .then(updateVote => updateVote
                  .update({ voteType: req.params.vote }))
                .then(() => res
                  .status(200)
                  .json({
                    message: `${req.params.vote} successful.`
                  }));
            }
            return Votes.create({
              userId: req.userId,
              recipeId: req.params.recipeId,
              voteType: req.params.vote,
            })
              .then(votedRecipe => res
                .status(200)
                .json({
                  message: `${req.params.vote} successful.`,
                  votedRecipe: {
                    recipeId: votedRecipe.recipeId
                  }
                }));
          });
      })
      .catch(() => res
        .status(500)
        .json({
          message: errorMessage
        }));
  }
}

export default Vote;
