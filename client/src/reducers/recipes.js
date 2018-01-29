const recipeDefaultState = {
  recipes: [],
  userRecipe: []
};

export default (state = recipeDefaultState, action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [
        ...state,
        action.recipe,
      ];
    case 'GET_RECIPES':
      return {
        ...state,
        recipes: action.recipes
      };
    case 'GET_USER_RECIPES':
      return {
        ...state,
        userRecipe: action.userRecipe
      };
    case 'EDIT_RECIPE':
      return state.map((recipe) => {
        if (recipe.id === action.id) {
          return {
            ...recipe,
            ...action.updates,
          };
        }
        return recipe;
      });
    case 'REMOVE_RECIPE':
      return state.filter(({ id }) => {
        return id !== action.id;
      });
    default:
      return state;
  }
};
