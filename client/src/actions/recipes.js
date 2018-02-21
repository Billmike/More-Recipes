import axios from 'axios';
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
import downVoteRecipe from '../actionCreators/downVoteRecipe';
import './toastrConfig';

/**
 * Represents a function
 * @function
 *
 * @returns { object } - returns an object with an action type and all recipes
 */

export const startGetAllRecipes = page => dispatch =>
  axios
    .get(`http://localhost:8000/api/v1/recipes/${page}`)
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

export const startAddRecipe = (recipeData = {}) => (dispatch) => {
  const {
    name = '',
    description = '',
    img_url = 'no-img-here',
    category = '',
    ingredients = '',
    instructions = ''
  } = recipeData;

  const recipe = {
    name,
    description,
    img_url,
    category,
    ingredients,
    instructions
  };
  return axios
    .post('/api/v1/recipes', recipe)
    .then(() => {
      toastr.success('Recipe added successfully.');
      dispatch(addRecipe({
        id: recipe.id,
        ...recipe
      }));
    })
    .catch(error => Promise.reject(error.response.data.message));
};

/**
 * Represents a function
 * @function
 *
 * @returns { object } - returns an object with an action type and the user recipe object
 */

export const startGetUserRecipes = () => dispatch =>
  axios
    .get('/api/v1/users/recipes')
    .then((res) => {
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
  axios
    .put(`/api/v1/recipes/${id}/modify`, updates)
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
  axios
    .delete(`/api/v1/recipes/${id}`)
    .then(() => {
      toastr.success('Recipe deleted successfully.');
      dispatch(removeRecipe(id));
    })
    .catch(error => Promise.reject(error.response.message));

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startGetOneRecipe = id => dispatch =>
  axios
    .get(`http://localhost:8000/api/v1/recipe/${id}`)
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
  axios
    .post(`http://localhost:8000/api/v1/recipes/${id}/favorites`)
    .then((res) => {
      const authUserid = getstate().auth.user.id;
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
  axios
    .get(`http://localhost:8000/api/v1/users/${id}/favorites`)
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
  axios
    .post(`http://localhost:8000/api/v1/recipes/${id}/votes/upvote`)
    .then((res) => {
      console.log('looooggg', res.data);
      const authUserid = getstate().auth.user.id;
      toastr.success(res.data.message);
      dispatch(upVoteRecipe(res.data, authUserid));
    })
    .catch((err) => {
      console.log('err here', err);
      if (
        err.response.data.message ===
        'You need to be logged in to perform this action.'
      ) {
        toastr.error(err.response.data.message);
      } else if (
        err.response.data.message === 'You already upvoted on this recipe'
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

export const startDownVoteRecipe = id => dispatch =>
  axios
    .post(`http://localhost:8000/api/v1/recipes/${id}/votes/downvote`)
    .then((res) => {
      toastr.success(res.data.message);
    })
    .catch((err) => {
      if (
        err.response.data.message ===
        'You need to be logged in to perform this action.'
      ) {
        toastr.error(err.response.data.message);
      } else if (
        err.response.data.message === 'You already downvoted on this recipe'
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
  axios
    .post(`/api/v1/recipes/${id}/reviews`, reviewData)
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
