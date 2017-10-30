import userController from '../controllers/users';
import recipeController from '../controllers/recipes';
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
  app.put('/api/v1/recipe/:recipeId', Login.ensureLogin, User.isuser, recipeAdd, recipeController.modifyRecipe);
  app.get('/api/v1/recipes', recipeController.getRecipes);
};
