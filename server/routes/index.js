import userController from '../controllers/users';
import recipeController from '../controllers/recipes';
import Login from '../middleware/ensureLogin';
import User from '../middleware/isuser';
import recipeAdd from '../middleware/validateAddRecipe';
import reviewController from '../controllers/reviews';
import validateReview from '../middleware/validateReview';
import favorite from '../controllers/addFavorites';
import vote from '../controllers/voteRecipe';
import getSortedRecipes from '../controllers/getAllRecipes';


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the lamest API for now',
  }));
  app.post('/api/v1/users/signup', userController.signUp);
  app.post('/api/v1/users/signin', userController.signIn);
  app.post('/api/v1/recipes', Login.ensureLogin, User.isuser, recipeAdd, recipeController.addRecipe);
  app.put('/api/v1/recipes/:recipeId', Login.ensureLogin, User.isuser, recipeAdd, recipeController.modifyRecipe);
  app.post('/api/v1/recipes/:recipeId', Login.ensureLogin, User.isuser, validateReview, reviewController.addReviews);
  app.delete('/api/v1/recipes/:recipeId', recipeController.deleteRecipe);
  app.post('/api/v1/recipes/:recipeId/favorites', Login.ensureLogin, User.isuser, favorite.addFavorite);
  app.get('/api/v1/users/:userId/recipes', Login.ensureLogin, User.isuser, favorite.getFavorites);
  app.post('/api/v1/recipes/:id/votes-:vote', Login.ensureLogin, User.isuser, vote.voteRecipe);
  app.get('/api/v1/recipes', getSortedRecipes);
};
