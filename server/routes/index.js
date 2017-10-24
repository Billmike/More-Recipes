import exportData from '../controllers';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the lamest API for now',
  }));

  app.get('/api/v1/recipes', (req, res) => {
    res.status(200).json({ feed: exportData.dataObj });
  });

  app.post('/api/v1/recipes', (req, res) => {
    exportData.dataObj.dataObj.recipes.push({
      id: exportData.dataObj.dataObj.recipes.length, 
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    });
    res.status(200).json({ feed: exportData.dataObj });
  });

  app.put('/api/v1/recipes/:recipeId', (req, res) => {
    for (let i = 0; i <= exportData.dataObj.dataObj.recipes[0].id; i++) {
      if (i == req.params.recipeId) {
        console.log(exportData.dataObj.dataObj.recipes[i]);
        exportData.dataObj.dataObj.recipes.splice(i, exportData.dataUpdate.recipes);
      }
    }
    res.status(201).send({ message: 'Updated.', feed: exportData.dataUpdate });
  });

  app.delete('/api/v1/recipes/:recipeId', (req, res) => {
    for (let i = 0; i <= exportData.dataObj.dataObj.recipes.length; i++) {

      if (exportData.dataObj.dataObj.recipes[i].id == req.params.recipeId) {

        console.log(exportData.dataObj.dataObj.recipes[i]);
        exportData.dataObj.dataObj.recipes.splice(i, 1);

        res.status(201).json({
          message: 'Recipe has been deleted successfully, so there is nothing for us to return to you',
        });
      }
    }
    res.status(201).json({
      message: 'Recipe has  not been deleted successfully, so there is nothing for us to return to you',
    });
  });

  app.post('/api/v1/recipes/:recipeId/reviews', (req, res) => {
    res.status(200).json({
      reviews: {
        id: 1,
        content: 'Amazing recipe. I can\'t wait to try it out with my family members!',
      },
    });
  });

  app.get('/api/v1/recipes/sort/votes', (req, res) => {
    res.status(201).json({ feed: exportData.voteCount });
  });
};
