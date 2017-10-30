import Recipes from '../controllers/recipes';
import userController from '../controllers/users';
import recipeController from '../controllers/addRecipe';
import Login from '../middleware/ensureLogin';
import User from '../middleware/isuser';
import recipeAdd from '../middleware/validateAddRecipe';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the lamest API for now',
  }));
  app.post('/api/v1/users/signup', userController.signUp);
  app.post('/api/v1/users/signin', userController.signIn);
  app.post('/api/v1/recipes/testAdd', Login.ensureLogin, User.isuser, recipeAdd, recipeController.addRecipe);


  app.get('/api/v1/recipes', Recipes.getRecipes);
  app.post('/api/v1/recipes', Recipes.createRecipe);
  app.put('/api/v1/recipes/:recipeId', Recipes.updateRecipe);
  app.delete('/api/v1/recipes/:recipeId', Recipes.deleteRecipe);
  app.post('/api/v1/recipes/:recipeId/testVote', Recipes.upVote);
  app.post('/api/v1/recipes/:recipeId/testDownVote', Recipes.downVote);
  app.post('/api/v1/recipes/:recipeId/reviews', Recipes.reviews);
};
