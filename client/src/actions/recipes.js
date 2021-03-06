import toastr from 'toastr';
import axios from 'axios';
import addRecipe, { addRecipeRequest } from '../actionCreators/addRecipe';
import getAllRecipes,
{ getAllRecipesRequest } from '../actionCreators/getAllRecipes';
import getUserRecipe,
{ getUserRecipeRequest } from '../actionCreators/getUserRecipe';
import getOneRecipe from '../actionCreators/getOneRecipe';
import toggleFavorites from '../actionCreators/toggleFavorites';
import fetchFavorites from '../actionCreators/fetchFavorites';
import popularRecipe from '../actionCreators/popularRecipe';
import editRecipe from '../actionCreators/editRecipes';
import removeRecipe from '../actionCreators/removeRecipe';
import addReview, { addReviewRequest } from '../actionCreators/addReview';
import upVoteRecipe from '../actionCreators/upVoteRecipe';
import downVote from '../actionCreators/downVoteRecipe';
import searchRecipes from '../actionCreators/searchRecipes';
import instance from '../utils/axios';
import '../utils/toastrConfig';

/**
 * Action for fetching all recipes
 *
 * @returns { object } - returns an object with an action type and all recipes
 */

export const getAllRecipesAction = (page) => {
  return (dispatch) => {
    dispatch(getAllRecipesRequest());
    return instance.get(`/recipes/${page}`)
      .then((response) => {
        dispatch(getAllRecipes(response.data.recipeData, response.data.pages));
      }).catch(error => error);
  };
};

/**
* Action for fetching popular recipes
*
* @returns { object } - returns an object with
  an action type and popular recipes
*/

export const getPopularRecipes = () => dispatch =>
  instance.get('/recipes/popular')
    .then((response) => {
      dispatch(popularRecipe(response.data));
    })
    .catch(error => error);

/**
 * Action for adding recipe to the application
 *
 * @param { object } recipeData - The recipe object
 *
 * @returns { object } - returns an object with
 * an action type and the new recipe object
 */

export const addRecipeAction = recipeData => (dispatch) => {
  dispatch(addRecipeRequest());
  return instance
    .post('/recipes', recipeData)
    .then((response) => {
      toastr.success('Recipe added successfully.');
      dispatch(addRecipe(response.data));
    })
    .catch((error) => {
      if (error.response.data
        .message === 'You already have a recipe with this name') {
        toastr.warning(error.response.data.message);
      }
    });
};


/**
 * Action to fecth user recipes
 *
 * @returns { object } - returns an object with an
 * action type and the user recipe object
 */

export const getUserRecipesAction = () => {
  return (dispatch) => {
    dispatch(getUserRecipeRequest());
    return instance.get('/users/recipes')
      .then((response) => {
        dispatch(getUserRecipe(response.data.recipeData));
      }).catch(error => error);
  };
};


/**
 * Action to edit a recipe
 *
 * @param { number } id - The recipe id
 * @param { object } updates - The recipe details
 *
 * @returns { object } - returns an object with an
 * action type and the new recipe object
 */

export const editRecipeAction = (id, updates) => dispatch =>
  instance
    .put(`/recipes/${id}`, updates)
    .then((response) => {
      toastr.success('Recipe edited successfully.');
      dispatch(editRecipe(id, updates));
    })
    .catch(error => error);

/**
 * Action to delete a recipe from the application
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const removeRecipeAction = id => dispatch =>
  instance
    .delete(`/recipe/${id}`)
    .then((response) => {
      toastr.info('Recipe deleted successfully.');
      dispatch(removeRecipe(response.data.recipeId));
    })
    .catch(error => error);

/**
 * Action to fetch just one recipe
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const getOneRecipeAction = id => dispatch =>
  instance
    .get(`/recipe/${id}`)
    .then((response) => {
      dispatch(getOneRecipe(response.data.recipeData));
    })
    .catch(error => Promise.reject(error.response.data.message));

/**
 * Action to add favorites
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const addFavoriteRecipesAction = id => (dispatch, getstate) =>
  instance
    .post(`/recipes/${id}/favorites`)
    .then((response) => {
      const authUserid = getstate().auth.userDetails.id;
      toastr.info(response.data.message);
      return dispatch(toggleFavorites(
        response.data,
        authUserid,
        response.data.message === 'Recipe removed from your favorites.'
          ? 'remove'
          : 'add'
      ));
    })
    .catch((err) => {
      if (
        err.response.data.message ===
        'You need to be logged in to perform this action.'
      ) {
        toastr.error(err.response.data.message);
      } else if (
        err.response.data.message ===
        'Sorry, you cannot perform this action on your own recipe.'
      ) {
        toastr.error(err.response.data.message);
      }
    });
/**
 * Action to fetch the favorites of a user
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const getUserFavoritesAction = id => dispatch =>
  instance
    .get(`/users/${id}/favorites`)
    .then((response) => {
      dispatch(fetchFavorites(response.data));
    })
    .catch(error => error);

/**
 * Action to upvote a recipe
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const upvoteRecipeAction = id => (dispatch, getstate) =>
  instance
    .post(`/recipes/${id}/votes/upvote`)
    .then((response) => {
      const authUserid = getstate().auth.userDetails.id;
      toastr.info(response.data.message);
      dispatch(upVoteRecipe(response.data, authUserid));
    })
    .catch((err) => {
      if (
        err.response.data.message ===
        'You need to be logged in to perform this action.'
      ) {
        toastr.error(err.response.data.message);
      } else if (
        err.response.data.message === 'Sorry! You already upvoted this recipe!'
      ) {
        toastr.warning(err.response.data.message);
      } else if (
        err.response.data.message === 'You cannot vote on your own recipe.'
      ) {
        toastr.error(err.response.data.message);
      }
    });

/**
 * Action to downvote a recipe
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const downVoteRecipeAction = id => (dispatch, getstate) =>
  instance
    .post(`/recipes/${id}/votes/downvote`)
    .then((response) => {
      const authUserid = getstate().auth.userDetails.id;
      toastr.info(response.data.message);
      dispatch(downVote(response.data, authUserid));
    })
    .catch((err) => {
      if (
        err.response.data.message ===
        'You need to be logged in to perform this action.'
      ) {
        toastr.error(err.response.data.message);
      } else if (
        err.response.data
          .message === 'Sorry! You already downvoted this recipe!'
      ) {
        toastr.warning(err.response.data.message);
      } else if (
        err.response.data.message === 'You cannot vote on your own recipe.'
      ) {
        toastr.error(err.response.data.message);
      }
    });

/**
 * Action to post a review about a recipe
 *
 * @param { number } id - The recipe id
 * @param { object } reviewData - The review object
 *
 * @returns { object } - returns an object
 * with an action type and the new review object
 */

export const addReviewAction = (id, review) => {
  return (dispatch) => {
    dispatch(addReviewRequest());
    return instance.post(`/recipes/${id}/reviews`, review)
      .then((response) => {
        toastr.success(response.data.message);
        dispatch(addReview(response.data));
      }).catch((err) => {
        if (
          err.response.data.message ===
          'You need to be logged in to perform this action.'
        ) {
          toastr.error(err.response.data.message);
        } else if (
          err.response.data.message ===
          "You can't post an empty review. Please, enter a happy review for this recipe."
        ) {
          toastr.warning(err.response.data.message);
        }
      });
  };
};

export const searchRecipesAction = (searchQuery, page) => dispatch =>
  instance.get(`/recipes/search?search=${searchQuery}&page=${page}`)
    .then((response) => {
      dispatch(searchRecipes(response.data, response.data.pages));
    })
    .catch(error => error);
