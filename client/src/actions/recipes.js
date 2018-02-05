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

export const addRecipe = recipe => ({
  type: ADD_RECIPE,
  recipe
});

export const getAllRecipes = (recipes) => {
  return {
    type: GET_RECIPES,
    recipes,
  };
};

export const getOneRecipe = (recipe) => {
  return {
    type: GET_ONE_RECIPE,
    id: recipe.id,
    recipe
  };
};

export const getUserRecipe = (userRecipe) => {
  return {
    type: GET_USER_RECIPES,
    userRecipe,
  };
};

export const addFavorites = (favoriteRecipes) => {
  return {
    type: ADD_FAVORITE_RECIPE,
    favoriteRecipes
  };
};

export const fetchFavorites = (favoriteRecipes) => {
  return {
    type: FETCH_FAVORITE_RECIPES,
    favoriteRecipes,
  };
};

export const editRecipe = (id, updates) => ({
  type: EDIT_RECIPE,
  id,
  updates,
});

export const removeRecipe = ({ id } = {}) => ({
  type: REMOVE_RECIPE,
  id
});

export const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

export const upVoteRecipe = (id) => {
  return {
    type: UPVOTE_RECIPE,
    id,
  };
};

export const downVoteRecipe = (id) => {
  return {
    type: DOWNVOTE_RECIPE,
    id,
  };
};

export const startGetAllRecipes = () => {
  return (dispatch) => {
    axios.get('http://localhost:8000/api/v1/recipes')
      .then((res) => {
        dispatch(getAllRecipes(res.data.recipeData));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

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
    axios.post('http://localhost:8000/api/v1/recipes', recipe)
      .then(() => {
        toastr.success('Recipe added successfully.');
        dispatch(addRecipe({
          id: recipe.id,
          ...recipe
        }));
      });
  };
};

export const startGetUserRecipes = () => {
  return (dispatch) => {
    axios.get('http://localhost:8000/api/v1/users/recipes')
      .then((res) => {
        dispatch(getUserRecipe(res.data.userRecipe));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const startEditRecipe = (id, updates) => {
  return (dispatch) => {
    axios.put(`http://localhost:8000/api/v1/recipes/${id}/modify`, updates)
      .then(() => {
        toastr.success('Recipe edited successfully.');
        dispatch(editRecipe(id, updates));
      })
      .catch((error) => {
        console.log('_<_<_<_<_<__<_', error);
      });
  };
};

export const startRemoveRecipe = (id) => {
  return (dispatch) => {
    axios.delete(`http://localhost:8000/api/v1/recipes/${id}`)
      .then(() => {
        toastr.success('Recipe deleted successfully.');
        dispatch(removeRecipe(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const startGetOneRecipe = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:8000/api/v1/recipes/${id}`)
      .then((res) => {
        dispatch(getOneRecipe(res.data.recipeData));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const startAddFavoriteRecipes = (id) => {
  return (dispatch) => {
    axios.post(`http://localhost:8000/api/v1/recipes/${id}/favorites`)
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

export const startGetUserFavorites = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:8000/api/v1/users/${id}/favorites`)
      .then((res) => {
        dispatch(fetchFavorites(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const startUpvoteRecipe = (id) => {
  return (dispatch) => {
    axios.post(`http://localhost:8000/api/v1/recipes/${id}/votes/upvote`)
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
        }
      });
  };
};

export const startDownVoteRecipe = (id) => {
  return (dispatch) => {
    axios.post(`http://localhost:8000/api/v1/recipes/${id}/votes/downvote`)
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
        }
      });
  };
};

export const startAddReview = (id, data) => {
  return (dispatch) => {
    axios.post(`http://localhost:8000/api/v1/recipes/${id}/reviews`, data)
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
