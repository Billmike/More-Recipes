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
    message: 'Welcome to the More-Recipes API',
  }));

  /**
   * @api { post } /api/v1/users/signup Users Signup
   * @apiGroup User
   * @apiParam { String } username User's username
   * @apiParam { String } email User's email address
   * @apiParam { String } password User's password
   * @apiParamExample { json } input
   * {
   *    "username": "verninin12",
   *    "email": "verninng@gmail.com",
   *    "password": "password1",
   * }
   * @apiSuccess { String } details User details and token
   * @apiSuccessExample { json } Success
   *    HTTP 1.1 201 OK
   * {
   *    "id": 1,
   *    "username": "verninin12",
   *    "email": "verninng@gmail.com",
   *    "createdAt": "2017-09-17T23:21:18.057Z",
   *    "updatedAt": "2017-09-17T23:21:18.057Z",
   *    token: {
   *        "token": "qweuiwehibkjbs.dknsdjiueiw.uiebdhj3242"
   *    }
   * }
   * @apiErrorExample { json } Account creation error
   *   HTTP 1.1 409 Conflict
   */
  app.post('/api/v1/users/signup', userController.signUp);

/**
 * @api { post } /api/v1/users/signin Users signup
 * @apiGroup User
 * @apiParam { String } email User's email address
 * @apiParam { String } password Usesr's password
 * @apiParamExample { json } input
 * {
 *    "email": "verninin12",
 *    "password": "password1",
 * }
 * @apiSuccess { String } token Signin token
 * @apiSuccessExample { json } Success
 * HTTP 1.1 201 OK
 * {
 *    token: "qweweiorwnjklksnlkds.jksbajskuisab.jskabnskjsuabk",
 * }
 * @apiErrorExample { json } Authentication error
 *   HTTP 1.1 401 Unauthorized
 */
  app.post('/api/v1/users/signin', userController.signIn);

/**
 * @api { post } /api/v1/recipes Add recipes
 * @apiGroup Recipe
 * @apiParam { String } name Recipe Name
 * @apiParam { String } description Brief description of recipe
 * @apiParam { String } img_link Link to recipe's image
 * @apiParam { String } category Recipe's category
 * @apiParam { Array } ingredients Recipe's ingredients
 * @apiParam { Array } instructions Step by step instruction for the recipe
 * @apiParamExample { json } input
 * {
 *    "name": "Awesome Fried Rice",
 *    "description": "The best fried rice in the world",
 *    "img_link": "https://some-image-link-here",
 *    "category": "Lunch",
 *    "ingredients": ["Rice", "Tomatoes", "Plum", "Pepper"],
 *    "instructions": ["Cook this damn food well peeps."]
 * }
 * @apiSuccess { Object } recipe Created recipe
 * @apiSuccessExample { json } Success
 * HTTP 1.1 201 OK
 * {
 *    "id": 1,
 *    "name": "Awesome Fried Rice",
 *    "description": "The best fried rice in the world",
 *    "img_link": "https://some-image-link-here",
 *    "category": "Lunch",
 *    "ingredients": ["Rice", "Tomatoes", "Plum", "Pepper"],
 *    "instructions": ["Cook this damn food well peeps."]
 *    "owner": 2,
 *    "upvote": 0,
 *    "downvote": 0,
 *    "favorite": 0,
 *    "reviews": 0,
 *    "createdAt": "2017-09-17T23:21:18.057Z",
 *   "updatedAt": "2017-09-17T23:21:18.057Z", 
 * }
 *
 */
  app.post('/api/v1/recipes', Login.ensureLogin, User.isuser, recipeAdd, recipeController.addRecipe);

/**
 * @api { put } /api/v1/recipes/:recipeId/modify Modify a recipe
 * @apiGroup Recipe
 * @apiHeader { String } Authorization token of autheticated user
 * @apiHeaderExample { json } Header
 *    { "Authorization": "JWT awqnlkjoi.asjaksiuao.djksduise" }
 * @apiParam { id } recipeId Recipe Id
 * @apiParam { String } name Update recipe name
 * @apiParamExample { json } Input
 * {
 *    "name": "Modified recipe name"
 * }
 * @apiSuccessExample { json }  Success
 * HTTP 1.1 204 No content
 * {
 *    "id": 1,
 *    "name": "Modified recipe name",
 *    "description": "The best fried rice in the world",
 *    "img_link": "https://some-image-link-here",
 *    "category": "Lunch",
 *    "ingredients": ["Rice", "Tomatoes", "Plum", "Pepper"],
 *    "instructions": ["Cook this damn food well peeps."]
 *    "owner": 2,
 *    "upvote": 0,
 *    "downvote": 0,
 *    "favorite": 0,
 *    "reviews": 0,
 *    "createdAt": "2017-09-17T23:21:18.057Z",
 *    "updatedAt": "2017-09-17T23:21:18.057Z",
 * }
 *
 */
  app.put('/api/v1/recipes/:recipeId/modify', Login.ensureLogin, User.isuser, recipeController.modifyRecipe);

/**
 * @api { post } /api/v1/recipes/:recipeId/reviews Review a recipe
 * @apiGroup Recipe
 * @apiHeader { String } Authorization token of authenticated user
 * @apiHeaderExample { json } Header
 *   { "Authorization": "JWT akjsjasnoie.sdrer434.32fdfrdrer" }
 * @apiParam { id } recipeId Recipe id
 * @apiParam { String } content Review
 * @apiParamExample { json } Input
 * {
 *    "content": "An Amazing recipe. Great Job!"
 * }
 * @apiSuccessExample { json } Success
 * HTTP 1.1 201 OK
 * {
 *    "id": 1,
 *    "name": "Modified recipe name",
 *    "description": "The best fried rice in the world",
 *    "img_link": "https://some-image-link-here",
 *    "category": "Lunch",
 *    "ingredients": ["Rice", "Tomatoes", "Plum", "Pepper"],
 *    "instructions": ["Cook this damn food well peeps."]
 *    "owner": 2,
 *    "upvote": 0,
 *    "downvote": 0,
 *    "favorite": 0,
 *    "reviews": [
 *        {
 *            "id": 1,
 *            "content": "An Amazing recipe. Great Job!",
 *            "createdAt": "2017-09-17T23:21:18.057Z",
 *            "updatedAt": "2017-09-17T23:21:18.057Z",
 *        }
 *    ],
 *    "createdAt": "2017-09-17T23:21:18.057Z",
 *    "updatedAt": "2017-09-17T23:21:18.057Z",
 * }
 */
  app.post('/api/v1/recipes/:recipeId/reviews', Login.ensureLogin, User.isuser, validateReview, reviewController.addReviews);

/**
 * @api { delete } /api/v1/recipes/:recipeId Delete a recipe
 * @apiGroup Recipe
 * @apiHeader { String } Authorization token of authenticated user
 * @apiHeaderExample { json } Header
 *   { "Authorization": "JWT akjsjasnoie.sdrer434.32fdfrdrer" }
 * @apiParam { id } recipeId Recipe Id
 * @apiSuccessExample { json } Success
 * HTTP 1.1 204 No Content
 */
  app.delete('/api/v1/recipes/:recipeId', recipeController.deleteRecipe);
  app.post('/api/v1/recipes/:recipeId/favorites', Login.ensureLogin, User.isuser, favorite.addFavorite);

/**
 * @api { get } /api/v1/users/:userId/favorites Get user favorite recipes
 * @apiGroup User
 * @apiParam { id } userId User's Id
 * @apiSuccessExample { json } Success
 * HTTP 201 Ok
 * {
 *    "recipes": [
      {
        "id": 1,
        "name": "very delicious dish",
        "description": "This is the recipe for a very delicious dish",
        "img_link": "https://imgurlfordish.com/verydelicousdish.jpg",
        "ingredients": [
          "something here",
          "something here",
        ],
        "instructions": [
          "Follow this step to get started on this dish",
          "Second step here",
        ],
        "upvote": 0,
        "downvotw": 0,
        "favorite": 1,
        "owner": 2,
        "createdAt": "2017-09-17T07:52:15.103Z",
        "updatedAt": "2017-09-18T23:16:21.324Z",
      }
    ],
 * }
 */
  app.get('/api/v1/users/:userId/favorites', Login.ensureLogin, User.isuser, favorite.getFavorites);
  app.post('/api/v1/recipes/:id/votes/:vote', Login.ensureLogin, User.isuser, vote.voteRecipe);
  /**
   * @api { get } /api/v1/recipes Get all Recipes
   * @apiGroup Recipe
   * @apiSuccess { Object } status All recipes in the application
   * @apiSuccessExample {json}  Success
   * HTTP/1.1 201 OK
   * {
 *    "id": 1,
 *    "name": "Modified recipe name",
 *    "description": "The best fried rice in the world",
 *    "img_link": "https://some-image-link-here",
 *    "category": "Lunch",
 *    "ingredients": ["Rice", "Tomatoes", "Plum", "Pepper"],
 *    "instructions": ["Cook this damn food well peeps."]
 *    "owner": 2,
 *    "upvote": 0,
 *    "downvote": 0,
 *    "favorite": 0,
 *    "reviews": [
 *        {
 *            "id": 1,
 *            "content": "An Amazing recipe. Great Job!",
 *            "createdAt": "2017-09-17T23:21:18.057Z",
 *            "updatedAt": "2017-09-17T23:21:18.057Z",
 *        }
 *    ],
 *    "createdAt": "2017-09-17T23:21:18.057Z",
 *    "updatedAt": "2017-09-17T23:21:18.057Z",
 * },
 * {
 *    "id": 2,
 *    "name": "Modified recipe name",
 *    "description": "The best fried rice in the world",
 *    "img_link": "https://some-image-link-here",
 *    "category": "Lunch",
 *    "ingredients": ["Rice", "Tomatoes", "Plum", "Pepper"],
 *    "instructions": ["Cook this damn food well peeps."]
 *    "owner": 2,
 *    "upvote": 0,
 *    "downvote": 0,
 *    "favorite": 0,
 *    "reviews": [
 *        {
 *            "id": 1,
 *            "content": "An Amazing recipe. Great Job!",
 *            "createdAt": "2017-09-17T23:21:18.057Z",
 *            "updatedAt": "2017-09-17T23:21:18.057Z",
 *        }
 *    ],
 *    "createdAt": "2017-09-17T23:21:18.057Z",
 *    "updatedAt": "2017-09-17T23:21:18.057Z",
 * },
 * {
 *    "id": 3,
 *    "name": "Modified recipe name",
 *    "description": "The best fried rice in the world",
 *    "img_link": "https://some-image-link-here",
 *    "category": "Lunch",
 *    "ingredients": ["Rice", "Tomatoes", "Plum", "Pepper"],
 *    "instructions": ["Cook this damn food well peeps."]
 *    "owner": 2,
 *    "upvote": 0,
 *    "downvote": 0,
 *    "favorite": 0,
 *    "reviews": [
 *        {
 *            "id": 1,
 *            "content": "An Amazing recipe. Great Job!",
 *            "createdAt": "2017-09-17T23:21:18.057Z",
 *            "updatedAt": "2017-09-17T23:21:18.057Z",
 *        }
 *    ],
 *    "createdAt": "2017-09-17T23:21:18.057Z",
 *    "updatedAt": "2017-09-17T23:21:18.057Z",
 * },
 * {
 *    "id": 4,
 *    "name": "Modified recipe name",
 *    "description": "The best fried rice in the world",
 *    "img_link": "https://some-image-link-here",
 *    "category": "Lunch",
 *    "ingredients": ["Rice", "Tomatoes", "Plum", "Pepper"],
 *    "instructions": ["Cook this damn food well peeps."]
 *    "owner": 2,
 *    "upvote": 0,
 *    "downvote": 0,
 *    "favorite": 0,
 *    "reviews": [
 *        {
 *            "id": 1,
 *            "content": "An Amazing recipe. Great Job!",
 *            "createdAt": "2017-09-17T23:21:18.057Z",
 *            "updatedAt": "2017-09-17T23:21:18.057Z",
 *        }
 *    ],
 *    "createdAt": "2017-09-17T23:21:18.057Z",
 *    "updatedAt": "2017-09-17T23:21:18.057Z",
 * }
   */
  app.get('/api/v1/recipes', getSortedRecipes);
};
