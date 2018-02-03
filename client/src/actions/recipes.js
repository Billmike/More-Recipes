import axios from 'axios';

export const addRecipe = recipe => ({
  type: 'ADD_RECIPE',
  recipe
});

export const getAllRecipes = (recipes) => {
  return {
    type: 'GET_RECIPES',
    recipes,
  };
};

export const getOneRecipe = (recipe) => {
  return {
    type: 'GET_ONE_RECIPE',
    id: recipe.id,
    recipe
  };
};

export const getUserRecipe = (userRecipe) => {
  return {
    type: 'GET_USER_RECIPES',
    userRecipe,
  };
};

export const addFavorites = (favoriteRecipes) => {
  return {
    type: 'ADD_FAVORITE_RECIPE',
    favoriteRecipes
  };
};

export const editRecipe = (id, updates) => ({
  type: 'EDIT_RECIPE',
  id,
  updates,
});

export const removeRecipe = ({ id } = {}) => ({
  type: 'REMOVE_RECIPE',
  id
});

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
        console.log(res.data);
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
        console.log(res.data);
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
        console.log('Favorite recipes action called', res);
        return dispatch(addFavorites(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
