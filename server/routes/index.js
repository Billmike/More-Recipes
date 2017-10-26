import Recipes from '../controllers/recipes';
import Reviews from '../controllers/review';
import Votes from '../controllers/votes';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the lamest API for now',
  }));

  app.get('/api/v1/recipes', Recipes.getRecipes);
  app.post('/api/v1/recipes', Recipes.createRecipe);
  app.put('/api/v1/recipes/:recipeId', Recipes.updateRecipe);
  app.delete('/api/v1/recipes/:recipeId', Recipes.deleteRecipe);
  app.post('/api/v1/recipes/:recipeId/reviews', Reviews.addReview);
  app.post('/api/v1/recipes/:recipeId/upVotes', Votes.upVotes);
  app.post('/api/v1/recipes/:recipeId/downVotes', Votes.downVotes);
  app.get('/api/v1/recipes/:recipeId/allVotes', Votes.allVotes);
};
