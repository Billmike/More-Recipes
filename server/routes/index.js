import userController from '../controllers/users';
import recipeController from '../controllers/recipes';
import Login from '../middleware/IsLoggedIn';
import User from '../middleware/SessionControl';
import recipeAdd from '../middleware/validateAddRecipe';
import reviewController from '../controllers/reviews';
import validateReview from '../middleware/validateReview';
import favorite from '../controllers/addFavorites';
import vote from '../controllers/voteRecipe';
import getSortedRecipes from '../controllers/getAllRecipes';

module.exports = (app) => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the More-Recipes API'
    }));

  app.get('/api/v1/users/get_user', User.getUser);
  app.get('/api/v1/recipe/:recipeId', getSortedRecipes);
  app.get('/api/v1/recipes/search', recipeController.searchRecipes);

  app.post('/api/v1/users/signin', userController.signIn);

  app.post('/api/v1/users/signup', userController.signUp);

  app.post(
    '/api/v1/recipes',
    Login.hasToken,
    User.isuser,
    recipeAdd,
    recipeController.addRecipe
  );

  app.put(
    '/api/v1/recipes/:recipeId/modify',
    Login.hasToken,
    User.isuser,
    recipeController.modifyRecipe
  );

  app.post(
    '/api/v1/recipes/:recipeId/reviews',
    Login.hasToken,
    User.isuser,
    validateReview,
    reviewController.addReviews
  );

  app.delete(
    '/api/v1/recipes/:recipeId',
    Login.hasToken,
    User.isuser,
    recipeController.deleteRecipe
  );
  app.post(
    '/api/v1/recipes/:recipeId/favorites',
    Login.hasToken,
    User.isuser,
    favorite.addFavorite
  );

  app.get(
    '/api/v1/users/:userId/favorites',
    Login.hasToken,
    User.isuser,
    favorite.getFavorites
  );
  app.post(
    '/api/v1/recipes/:recipeId/votes/:vote',
    Login.hasToken,
    User.isuser,
    vote.voteRecipe
  );

  app.get('/api/v1/recipes/:page', recipeController.getRecipes);
  app.get(
    '/api/v1/users/recipes',
    Login.hasToken,
    User.isuser,
    recipeController.getUserRecipes
  );
};
