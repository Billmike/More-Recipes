import db from '../models/index';

const Votes = db.Vote;

class Vote {
  static voteRecipe(req, res, next) {
    // const { vote, id } = req.params;
    //  const { UID } = req;

    if (req.params.vote !== 'downvote' && req.params.vote !== 'upvote') {
      const err = res.status(404).send({ status: 'Not Found.', message: 'URL not found.' });
      return next(err);
    }

    Votes.findAll({
      where: {
        recipeId: req.params.id,
      },
    })
      .then((votes) => {
        if (votes.length === 0) {
          return Votes.create({
            userId: req.userId,
            recipeId: req.params.id,
            voteType: req.params.vote,
          })
            .then(() => res.status(200).send({ status: 'Success.', message: 'Thanks for your feedback!' }))
            .catch(error => res.status(400).send({ status: 'Failed.', message: error.message }));
        }
        const voteArray = [];
        votes.forEach((elem) => {
          voteArray.push(elem.dataValues.userId);
        });
        if (voteArray.includes(req.userId)) {
          const countVote = votes.filter(elem => elem.dataValues.userId === req.userId)[0];
          if (countVote.dataValues.voteType === req.params.vote) {
            const err = res.status(403).send({ status: 'Denied.', message: 'You already voted on this recipe.' });
            return next(err);
          }
          return Votes.findById(countVote.dataValues.id)
            .then(updateVote => updateVote.update({ voteType: req.params.vote }))
            .then(() => res.status(200).send({ status: 'Success.', message: 'Vote Updated.' }));
        }
        Votes.create({
          userId: req.userId,
          recipeId: req.params.id,
          voteType: req.params.vote,
        })
          .then(() => res.status(200).send({ status: 'Success.', message: 'Vote Recorded.' }))
          .catch((error) => {
            const err = res.status(400).send({ message: error.message });
            return next(err);
          });
      });
  }
}

export default Vote;
