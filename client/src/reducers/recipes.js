const recipeDefaultState = {
  pages: 0,
  recipes: [],
  userRecipe: [],
  singleRecipe: '',
  favoriteRecipes: [],
  userFavoriteRecipesId: []
};

export default (state = recipeDefaultState, action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return {
        ...state,
        userRecipe: [...action.recipe],
        recipes: [...action.recipe]
      };
    case 'GET_RECIPES':
      return {
        ...state,
        pages: action.pagination,
        recipes: [...action.recipes]
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
      return state.userRecipe.map((recipe) => {
        if (recipe.id == action.id) {
          return {
            ...recipe,
            ...action.updates
          };
        }
        return recipe;
      });
    case 'REMOVE_RECIPE':
      return state.userRecipe.filter(({ id }) => id !== action.id);
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id !== action.favoriteRecipes.favoritedRecipe.recipeId) {
            return recipe;
          }
          return {
            ...recipe,
            favorites: action.toggleType === 'add' ? [
              ...recipe.favorites,
              { userId: action.userId }
            ] : recipe.favorites
              .filter(favorite => favorite.userId !== action.userId)
          };
        })
      };
    case 'UPVOTE_RECIPE':
      return {
        ...state,
        singleRecipe: state.singleRecipe.votes.userId !== action.userId ? {
          ...state.singleRecipe,
          votes: [
            ...state.singleRecipe.votes,
            { userId: action.userId }
          ]
        } : state.singleRecipe.votes
          .filter(vote => vote.userId !== action.userId)
      };
    case 'FETCH_FAVORITE_RECIPES':
      return {
        ...state,
        ...{
          favoriteRecipes: action.favoriteRecipes.recipes
        }
      };
    case 'ADD_REVIEW':
      return {
        ...state,
        singleRecipe: state.singleRecipe.reviews.concat(action.review.reviewData)
      };
    default:
      return state;
  }
};
