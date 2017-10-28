import Recipes from '../controllers/recipes';
import userController from '../controllers/users';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the lamest API for now',
  }));
  app.post('/api/v1/users/signup', userController.signUp);
  app.get('/api/v1/recipes', Recipes.getRecipes);
  app.post('/api/v1/recipes', Recipes.createRecipe);
  app.put('/api/v1/recipes/:recipeId', Recipes.updateRecipe);
  app.delete('/api/v1/recipes/:recipeId', Recipes.deleteRecipe);
  app.post('/api/v1/recipes/:recipeId/testVote', Recipes.upVote);
  app.post('/api/v1/recipes/:recipeId/testDownVote', Recipes.downVote);
  app.post('/api/v1/recipes/:recipeId/reviews', Recipes.reviews);
};
