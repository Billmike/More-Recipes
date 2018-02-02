const recipeDefaultState = {
  recipes: [],
  userRecipe: [],
  singleRecipe: ''
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
    case 'GET_ONE_RECIPE':
      return {
        ...state,
        singleRecipe: action.recipe
      };
    case 'GET_USER_RECIPES':
      return {
        ...state,
        userRecipe: action.userRecipe
      };
    case 'EDIT_RECIPE':
      console.log('this is the state in the edit recipe reducer', state);
      return state.userRecipe.map((recipe) => {
        if (recipe.id == action.id) {
          return {
            ...recipe,
            ...action.updates,
          };
        }
        return recipe;
      });
    case 'REMOVE_RECIPE':
      console.log('Remove recipe state', state);
      return state.userRecipe.filter(({ id }) => {
        return id !== action.id;
      });
    default:
      return state;
  }
};
