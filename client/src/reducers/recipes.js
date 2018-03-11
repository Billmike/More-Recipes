export const recipeDefaultState = {
  pages: 0,
  recipes: [],
  userRecipe: [],
  singleRecipe: '',
  popularRecipes: [],
  favoriteRecipes: [],
  userFavoriteRecipesId: []
};

export default (state = recipeDefaultState, action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return {
        ...state,
        userRecipe: [...state.userRecipe, action.recipe.recipeData]
      };
    case 'GET_RECIPES':
      return {
        ...state,
        pages: action.pagination,
        recipes: [...action.recipes]
      };
    case 'POPULAR_RECIPES':
      console.log('the reducer got hit', action);
      return {
        ...state,
        popularRecipes: [...action.recipe.theFoundrecipes]
      };
    case 'GET_ONE_RECIPE':
      return {
        ...state,
        singleRecipe: action.recipe[0]
      };
    case 'GET_USER_RECIPES':
      return {
        ...state,
        userRecipe: action.userRecipe
      };
    case 'EDIT_RECIPE':
      return {
        ...state,
        userRecipe: state.userRecipe.map((recipe) => {
          if (recipe.id !== action.id) {
            return recipe;
          }
          return {
            ...recipe,
            ...action.updates
          };
        })
      };
    case 'REMOVE_RECIPE':
      return {
        ...state,
        userRecipe: state.userRecipe.filter((recipe) => {
          recipe.id !== action.id;
        })
      };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id !== action.favoriteRecipes.favoritedRecipe.recipeId) {
            return recipe;
          }
          return {
            ...recipe,
            favorites:
              action.toggleType === 'add'
                ? [...recipe.favorites, { userId: action.userId }]
                : recipe.favorites.filter(favorite => favorite
                  .userId !== action.userId)
          };
        }),
        popularRecipes: state.popularRecipes.map((recipe) => {
          if (recipe.id !== action.favoriteRecipes.favoritedRecipe.recipeId) {
            return recipe;
          }
          return {
            ...recipe,
            favorites:
              action.toggleType === 'add'
                ? [...recipe.favorites, { userId: action.userId }]
                : recipe.favorites
                  .filter(favorite => favorite.userId !== action.userId)
          };
        })
      };
    case 'UPVOTE_RECIPE':
      state.singleRecipe.downVote = state.singleRecipe
        .downVote > 0 ? state.singleRecipe
          .downVote - 1 : state.singleRecipe.downVote;
      return {
        ...state,
        singleRecipe: {
          ...state.singleRecipe,
          upVote: state.singleRecipe.upVote + 1
        }
      };
    case 'DOWNVOTE_RECIPE':
      state.singleRecipe.upVote = state.singleRecipe
        .upVote > 0 ? state.singleRecipe
          .upVote - 1 : state.singleRecipe.upVote;
      return {
        ...state,
        singleRecipe: {
          ...state.singleRecipe,
          downVote: state.singleRecipe.downVote + 1
        }
      };
    case 'FETCH_FAVORITE_RECIPES':
      return {
        ...state,
        favoriteRecipes: action.favoriteRecipes
      };
    case 'ADD_REVIEW':
      return {
        ...state,
        singleRecipe: {
          ...state.singleRecipe,
          reviews: state.singleRecipe.reviews.concat(action.review.reviewData)
        }
      };
    default:
      return state;
  }
};
