import userController from '../controllers/users';
import recipeController from '../controllers/recipes';
import Login from '../middleware/IsLoggedIn';
import User from '../middleware/SessionControl';
import recipeAdd from '../validators/validateAddRecipe';
import reviewController from '../controllers/reviews';
import validateReview from '../validators/validateReview';
import favorite from '../controllers/addFavorites';
import vote from '../controllers/voteRecipe';
import getOneRecipe, { getUserRecipes } from '../controllers/getAllRecipes';

module.exports = (app) => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the More-Recipes API'
    }));

  app.get('/api/v1/recipes/popular', recipeController.popularRecipes);

  app.get('/api/v1/users/get_user', User.getUser);
  app.get('/api/v1/recipe/:recipeId', getOneRecipe);
  app.get('/api/v1/recipes/search', recipeController.searchRecipes);

  app.post('/api/v1/users/signin', userController.signIn);

  app.post('/api/v1/users/signup', userController.signUp);

  app.post(
    '/api/v1/recipes',
    Login.hasToken,
    User.isUser,
    recipeAdd,
    recipeController.addRecipe
  );

  app.put(
    '/api/v1/recipes/:recipeId',
    Login.hasToken,
    User.isUser,
    recipeController.modifyRecipe
  );

  app.post(
    '/api/v1/recipes/:recipeId/reviews',
    Login.hasToken,
    User.isUser,
    validateReview,
    reviewController.addReviews
  );

  app.delete(
    '/api/v1/recipe/:recipeId',
    Login.hasToken,
    User.isUser,
    recipeController.deleteRecipe
  );
  app.post(
    '/api/v1/recipes/:recipeId/favorites',
    Login.hasToken,
    User.isUser,
    favorite.addFavorite
  );

  app.get(
    '/api/v1/users/:userId/favorites',
    Login.hasToken,
    User.isUser,
    favorite.getFavorites
  );
  app.post(
    '/api/v1/recipes/:recipeId/votes/:vote',
    Login.hasToken,
    User.isUser,
    vote.voteRecipe
  );
  app.get('/api/v1/recipes/:page', recipeController.getRecipes);
  app.get('/api/v1/users/recipes', Login.hasToken, User.isUser, getUserRecipes);
  app.put(
    '/api/v1/users/profile',
    Login.hasToken,
    User.isUser,
    userController.updateProfile
  );
};
