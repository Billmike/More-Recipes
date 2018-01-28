const recipeDefaultState = [];

export default (state = recipeDefaultState, action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [
        ...state,
        action.recipe,
      ];
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
