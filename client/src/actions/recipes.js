import addRecipe from '../actionCreators/addRecipe';
import getAllRecipes from '../actionCreators/getAllRecipes';
import getUserRecipe from '../actionCreators/getUserRecipe';
import getOneRecipe from '../actionCreators/getOneRecipe';
import toggleFavorites from '../actionCreators/toggleFavorites';
import fetchFavorites from '../actionCreators/fetchFavorites';
import editRecipe from '../actionCreators/editRecipes';
import removeRecipe from '../actionCreators/removeRecipe';
import addReview from '../actionCreators/addReview';
import upVoteRecipe from '../actionCreators/upVoteRecipe';
import downVote from '../actionCreators/downVoteRecipe';
import instance from '../utils/axios';
import './toastrConfig';

/**
 * Represents a function
 * @function
 *
 * @returns { object } - returns an object with an action type and all recipes
 */

export const startGetAllRecipes = page => dispatch =>
  instance
    .get(`/recipes/${page}`)
    .then((res) => {
      dispatch(getAllRecipes(res.data.recipeData, res.data.pages));
    })
    .catch(error => Promise.reject(error.response.message));

/**
 * Represents a function
 * @function
 *
 * @param { object } recipeData - The recipe object
 *
 * @returns { object } - returns an object with an action type and the new recipe object
 */

export const startAddRecipe = recipeData => (dispatch) => {

  return instance
    .post('/recipes', recipeData)
    .then((res) => {
      toastr.success('Recipe added successfully.');
      dispatch(addRecipe(res.data));
    })
    .catch((error) => {
      if (error.response.data
        .message === 'You already have a recipe with this name') {
        toastr.warning(error.response.data.message);
      }
    });
};

/**
 * Represents a function
 * @function
 *
 * @returns { object } - returns an object with an action type and the user recipe object
 */

export const startGetUserRecipes = () => dispatch =>
  instance
    .get('/users/recipes')
    .then((res) => {
      console.log('user res', res.data);
      dispatch(getUserRecipe(res.data.recipeData));
    })
    .catch(error => Promise.reject(error.response.message));

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 * @param { object } updates - The recipe details
 *
 * @returns { object } - returns an object with an action type and the new recipe object
 */

export const startEditRecipe = (id, updates) => dispatch =>
  instance
    .put(`/recipes/${id}/modify`, updates)
    .then(() => {
      toastr.success('Recipe edited successfully.');
      dispatch(editRecipe(id, updates));
    })
    .catch(error => Promise.reject(error));

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startRemoveRecipe = id => dispatch =>
  instance
    .delete(`/recipes/${id}`)
    .then((res) => {
      console.log('deleted recipe', res.data)
      toastr.success('Recipe deleted successfully.');
      dispatch(removeRecipe(res.data.recipeId));
    })
    .catch(error => {
      console.log(error);
    });

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startGetOneRecipe = id => dispatch =>
  instance
    .get(`/recipe/${id}`)
    .then((res) => {
      dispatch(getOneRecipe(res.data.recipeData));
    })
    .catch(error => Promise.reject(error.response.data.message));

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startAddFavoriteRecipes = id => (dispatch, getstate) =>
  instance
    .post(`/recipes/${id}/favorites`)
    .then((res) => {
      const authUserid = getstate().auth.userDetails.id;
      toastr.success(res.data.message);
      return dispatch(toggleFavorites(
        res.data,
        authUserid,
        res.data.message === 'Recipe removed from your favorites.'
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
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startGetUserFavorites = id => dispatch =>
  instance
    .get(`/users/${id}/favorites`)
    .then((res) => {
      dispatch(fetchFavorites(res.data));
    })
    .catch(error => Promise.reject(error.response.data.message));

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startUpvoteRecipe = id => (dispatch, getstate) =>
  instance
    .post(`/recipes/${id}/votes/upvote`)
    .then((res) => {
      const authUserid = getstate().auth.userDetails.id;
      toastr.success(res.data.message);
      dispatch(upVoteRecipe(res.data, authUserid));
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
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startDownVoteRecipe = id => (dispatch, getstate) =>
  instance
    .post(`/recipes/${id}/votes/downvote`)
    .then((res) => {
      const authUserid = getstate().auth.userDetails.id;
      toastr.success(res.data.message);
      dispatch(downVote(res.data, authUserid));
    })
    .catch((err) => {
      if (
        err.response.data.message ===
        'You need to be logged in to perform this action.'
      ) {
        toastr.error(err.response.data.message);
      } else if (
        err.response.data.message === 'Sorry! You already downvoted this recipe!'
      ) {
        toastr.warning(err.response.data.message);
      } else if (
        err.response.data.message === 'You cannot vote on your own recipe.'
      ) {
        toastr.error(err.response.data.message);
      }
    });

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 * @param { object } reviewData - The review object
 *
 * @returns { object } - returns an object with an action type and the new review object
 */

export const startAddReview = (id, reviewData) => dispatch =>
  instance
    .post(`/recipes/${id}/reviews`, reviewData)
    .then((res) => {
      toastr.success(res.data.message);
      dispatch(addReview(res.data));
    })
    .catch((err) => {
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
