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

export const getUserRecipe = (userRecipe) => {
  return {
    type: 'GET_USER_RECIPES',
    userRecipe,
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
      ingredients = [],
      instructions = []
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

export const editRecipe = (id, updates) => ({
  type: 'EDIT_RECIPE',
  id,
  updates,
});

export const removeRecipe = ({ id } = {}) => ({
  type: 'REMOVE_RECIPE',
  id
})
