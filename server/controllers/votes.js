import votes from '../models/votes';

class Votes {
  static upVotes(req, res) {
    for (let i = 0; i < votes.length; i += 1) {
      if (votes[i].id == req.params.recipeId) {
        const counter = parseInt(req.body.votes, 10);
        votes[i].votes += counter;
        res.status(200).json({ status: 'Success.', message: 'Vote successful. Carry on liking other recipes.' });
      }
    }
    res.status(400).json({ status: false, message: 'Some error occured. Our engineers are currently working on it.' });
  }

  static downVotes(req, res) {
    for (let i = 0; i < votes.length; i += 1) {
      if (votes[i].id == req.params.recipeId) {
        const counter = parseInt(req.body.votes, 10);
        votes[i].votes -= counter;
        res.status(200).json({ status: 'Success.', message: 'Succefully down-voted this recipe.' });
      }
    }
    res.status(400).json({ status: false, message: 'An error occured. Our engineers are currently working on rectifying it.' });
  }

  static allVotes(req, res) {
    for (let i = 0; i < votes.length; i += 1) {
      if (votes[i].id == req.params.recipeId) {
        res.status(201).send({ status: true, feed: votes[i] });
      }
    }
    res.status(400).json({ status: false, message: 'An Error occured. Our engineers are currently on the situation.' });
  }
}

export default Votes;
