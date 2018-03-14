export const recipeDefaultState = {
  pages: 1,
  recipes: [],
  userRecipe: [],
  singleRecipe: '',
  popularRecipes: [],
  favoriteRecipes: [],
  userFavoriteRecipesId: [],
  searchRecipe: [],
  isLoading: false
};

export default (state = recipeDefaultState, action) => {
  switch (action.type) {
    case 'ADD_RECIPE_REQUEST':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'ADD_RECIPE':
      return {
        ...state,
        userRecipe: [...state.userRecipe, action.recipe.recipeData],
        isLoading: action.isLoading
      };
    case 'GET_RECIPES_REQUEST':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'GET_RECIPES':
      return {
        ...state,
        pages: action.pagination,
        recipes: [...action.recipes],
        isLoading: action.isLoading
      };
    case 'POPULAR_RECIPES':
      return {
        ...state,
        popularRecipes: [...action.recipe.theFoundrecipes]
      };
    case 'GET_ONE_RECIPE':
      return {
        ...state,
        singleRecipe: action.recipe[0]
      };
    case 'GET_USER_RECIPES_REQUEST':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'GET_USER_RECIPES':
      return {
        ...state,
        userRecipe: action.userRecipe,
        isLoading: action.isLoading
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
    case 'ADD_REVIEW_REQUEST':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'ADD_REVIEW':
      return {
        ...state,
        singleRecipe: {
          ...state.singleRecipe,
          reviews: state.singleRecipe.reviews.concat(action.review.reviewData)
        },
        isLoading: action.isLoading
      };
    case 'SEARCH_RECIPES':
      return {
        ...state,
        recipes: [...action.recipes.recipeData],
        pages: action.pagination
      };
    default:
      return state;
  }
};
