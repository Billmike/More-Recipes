import exportData from '../controllers';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the lamest API for now',
  }));

  app.get('/api/v1/recipes', (req, res) => {
    res.status(200).json({ feed: exportData.dataObj.dataObj });
  });

  app.post('/api/v1/recipes', (req, res) => {
    exportData.dataObj.dataObj.recipes.push({
      id: exportData.dataObj.dataObj.recipes.length + 1,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      ingredients: [req.body.ingredients],
      instructions: [req.body.instructions],
    });
    res.status(200).json({ feed: exportData.dataObj.dataObj.recipes.slice(-1) });
  });

  app.delete('/api/v1/recipes/:recipeId', (req, res) => {
    for (let i = 0; i <= exportData.dataObj.dataObj.recipes.length; i++) {
      if (exportData.dataObj.dataObj.recipes[i].id == req.params.recipeId) {
        exportData.dataObj.dataObj.recipes.splice(i, 1);
        res.status(201).json({
          message: 'Recipe has been deleted successfully, so there is nothing for us to return to you',
        });
      } else {
        return res.status(400).json({
          message: 'Recipe has  not been deleted successfully. Something went wrong.',
        });
      }
    }
  });

  app.post('/api/v1/recipes/:recipeId/reviews', (req, res) => {
    exportData.reviewData.reviewData.review.push({
      id: exportData.reviewData.reviewData.review.length + 1,
      content: req.body.content,
    });
    res.status(201).json({ status: 'Review posted successful.', feed: exportData.reviewData });
  });

  app.post('/api/v1/recipes/:recipeId/upVotes', (req, res) => {
    for (let i = 0; i <= exportData.upVote.vote.length; i++) {
      if (exportData.upVote.vote[i].id == req.params.recipeId) {
        const counter = parseInt(req.body.voteCount, 10);
        exportData.upVote.vote[0].voteCount += counter;
        console.log(exportData.upVote.vote);
        res.status(200).send({ status: 'Vote success', message: 'You have voted successfully.' });
      } else {
        res.status(400).send({ status: 'Failed.', message: 'An unexpected error occured while you tried to cast a vote.' });
      }
    }
  });

  app.get('/api/v1/recipes/:recipeId/allVotes', (req, res) => {
    for (let i = 0; i < exportData.upVote.vote.length; i++) {
      if (exportData.upVote.vote[i].id == req.params.recipeId) {
        res.status(201).send({ status: true, feed: exportData.upVote.vote[i] });
      } else {
        res.status(400).send({ status: false, message: 'Sorry, we could not get the votes for this recipe.' });
      }
    }
  });
};
