const recipeDefaultState = {
  recipes: [],
  userRecipe: [],
  singleRecipe: '',
  favoriteRecipes: [],
  userFavoriteRecipesId: []
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
    case 'ADD_FAVORITE_RECIPE':
    console.log('acvtion in the add favs', action.favoriteRecipes);
      return {
        ...state,
        ...{
          userFavoriteRecipesId: action.favoriteRecipes.id
        },
        userFavoriteRecipesId: !state.userFavoriteRecipesId
          .includes(action.favoriteRecipes.id) ?
          state.userFavoriteRecipesId.concat(action.favoriteRecipes.id) :
          state.userFavoriteRecipesId
            .filter((id) => {
              console.log('bleeding recipe here', id);
              return id !== action.favoriteRecipes.id;
            })
      };
    default:
      return state;
  }
};
