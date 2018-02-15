import axios from 'axios';
import {
  ADD_RECIPE,
  GET_RECIPES,
  GET_ONE_RECIPE,
  GET_USER_RECIPES,
  ADD_FAVORITE_RECIPE,
  FETCH_FAVORITE_RECIPES,
  EDIT_RECIPE,
  REMOVE_RECIPE,
  ADD_REVIEW,
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE
} from './types';
import './toastrConfig';

/**
 * Represents a function
 * @function
 *
 * @param { object } recipe - The recipe object
 *
 * @returns { object } - returns an object with an action type and recipe
 */

export const addRecipe = recipe => ({
  type: ADD_RECIPE,
  recipe
});

/**
 * Represents a function
 * @function
 *
 * @param { object } recipes - The recipe object
 *
 * @returns { object } - returns an object with an action type and recipes
 */

export const getAllRecipes = (recipes, pagination) => {
  return {
    type: GET_RECIPES,
    recipes,
    pagination
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { object } recipe - The recipe object
 *
 * @returns { object } - returns an object with an action type and recipe
 */

export const getOneRecipe = (recipe) => {
  return {
    type: GET_ONE_RECIPE,
    recipe
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { object } userRecipe - The recipe object
 *
 * @returns { object } - returns an object with an action type and user recipe
 */

export const getUserRecipe = (userRecipe) => {
  return {
    type: GET_USER_RECIPES,
    userRecipe,
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { object } favoriteRecipes - The recipe object
 *
 * @returns { object } - returns an object with an action type and favorite recipe(s)
 */

export const addFavorites = (favoriteRecipes) => {
  return {
    type: ADD_FAVORITE_RECIPE,
    favoriteRecipes
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { object } favoriteRecipes - The recipe object
 *
 * @returns { object } - returns an object with an action type and favorite recipe(s)
 */

export const fetchFavorites = (favoriteRecipes) => {
  return {
    type: FETCH_FAVORITE_RECIPES,
    favoriteRecipes,
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { object } updates - The recipe object
 *
 * @returns { object } - returns an object with an action type and edited recipe
 */

export const editRecipe = updates => ({
  type: EDIT_RECIPE,
  updates,
});

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const removeRecipe = ({ id } = {}) => ({
  type: REMOVE_RECIPE,
  id
});

/**
 * Represents a function
 * @function
 *
 * @param { object } review - The review object
 *
 * @returns { object } - returns an object with an action type and recipe review
 */

export const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const upVoteRecipe = (id) => {
  return {
    type: UPVOTE_RECIPE,
    id,
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const downVoteRecipe = (id) => {
  return {
    type: DOWNVOTE_RECIPE,
    id,
  };
};

/**
 * Represents a function
 * @function
 *
 * @returns { object } - returns an object with an action type and all recipes
 */

export const startGetAllRecipes = (page) => {
  return (dispatch) => {
    return axios.get(`/api/v1/recipes/${page}`)
      .then((res) => {
        dispatch(getAllRecipes(res.data.recipeData));
      })
      .catch(error => Promise.reject(error.response.data.message));
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { object } recipeData - The recipe object
 *
 * @returns { object } - returns an object with an action type and the new recipe object
 */

export const startAddRecipe = (recipeData = {}) => {
  return (dispatch) => {
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
      instructions,
    };
    return axios.post('/api/v1/recipes', recipe)
      .then(() => {
        toastr.success('Recipe added successfully.');
        dispatch(addRecipe({
          id: recipe.id,
          ...recipe
        }));
      })
      .catch(error => Promise.reject(error.response.data.message));
  };
};

/**
 * Represents a function
 * @function
 *
 * @returns { object } - returns an object with an action type and the user recipe object
 */

export const startGetUserRecipes = () => {
  return (dispatch) => {
    return axios.get('/api/v1/users/recipes')
      .then((res) => {
        dispatch(getUserRecipe(res.data.userRecipe));
      })
      .catch(error => Promise.reject(error.response.data.message));
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 * @param { object } updates - The recipe details
 *
 * @returns { object } - returns an object with an action type and the new recipe object
 */

export const startEditRecipe = (id, updates) => {
  return (dispatch) => {
    return axios.put(`/api/v1/recipes/${id}/modify`, updates)
      .then(() => {
        toastr.success('Recipe edited successfully.');
        dispatch(editRecipe(id, updates));
      })
      .catch(error => Promise.reject(error.response.data.message));
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startRemoveRecipe = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/v1/recipes/${id}`)
      .then(() => {
        toastr.success('Recipe deleted successfully.');
        dispatch(removeRecipe(id));
      })
      .catch(error => Promise.reject(error.response.data.message));
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startGetOneRecipe = (id) => {
  return (dispatch) => {
    return axios.get(`/api/v1/recipe/${id}`)
      .then((res) => {
        dispatch(getOneRecipe(res.data.recipeData));
      })
      .catch(error => Promise.reject(error.response.data.message));
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startAddFavoriteRecipes = (id) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${id}/favorites`)
      .then((res) => {
        toastr.success(res.data.message);
        return dispatch(addFavorites(res.data));
      })
      .catch((err) => {
        if (err.response.data
          .message === 'You need to be logged in to perform this action.') {
          toastr.error(err.response.data.message);
        } else if (err.response.data
          .message === 'Sorry, you cannot perform this action on your own recipe.') {
          toastr.error(err.response.data.message);
        }
      });
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startGetUserFavorites = (id) => {
  return (dispatch) => {
    return axios.get(`/api/v1/users/${id}/favorites`)
      .then((res) => {
        dispatch(fetchFavorites(res.data));
      })
      .catch(error => Promise.reject(error.response.data.message));
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startUpvoteRecipe = (id) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${id}/votes/upvote`)
      .then((res) => {
        toastr.success(res.data.message);
      })
      .catch((err) => {
        if (err.response.data
          .message === 'You need to be logged in to perform this action.') {
          toastr.error(err.response.data.message);
        } else if (err.response.data
          .message === 'You already upvoted on this recipe') {
          toastr.warning(err.response.data.message);
        } else if (err.response.data
          .message === 'You cannot vote on your own recipe.') {
          toastr.error(err.response.data.message);
        }
      });
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

export const startDownVoteRecipe = (id) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${id}/votes/downvote`)
      .then((res) => {
        toastr.success(res.data.message);
      })
      .catch((err) => {
        if (err.response.data
          .message === 'You need to be logged in to perform this action.') {
          toastr.error(err.response.data.message);
        } else if (err.response.data
          .message === 'You already downvoted on this recipe') {
          toastr.warning(err.response.data.message);
        } else if (err.response.data
          .message === 'You cannot vote on your own recipe.') {
          toastr.error(err.response.data.message);
        }
      });
  };
};

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 * @param { object } reviewData - The review object
 *
 * @returns { object } - returns an object with an action type and the new review object
 */

export const startAddReview = (id, reviewData) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${id}/reviews`, reviewData)
      .then((res) => {
        dispatch(addReview(res.data));
      })
      .catch((err) => {
        if (err.response.data
          .message === 'You need to be logged in to perform this action.') {
          toastr.error(err.response.data.message);
        } else if (err.response.data
          .message === 'You can\'t post an empty review. Please, enter a happy review for this recipe.') {
          toastr.warning(err.response.data.message);
        }
      });
  };
};
