import expect from 'expect';
import { mockRecipesReducers } from '../__mocks__/reducers/recipes';
import recipeReducers from '../../reducers/recipes';
import { ADD_RECIPE, GET_USER_RECIPES } from '../../actions/types';

describe('Recipes Reducer', () => {
  it('Should return the initial state', () => {
    expect(recipeReducers(undefined, {})).toEqual({
      recipes: [],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    });
  });

  it('Should handle ADD_RECIPE action', () => {
    expect(
      recipeReducers(
        {
          singleRecipe: '',
          favoriteRecipes: [],
          userFavoriteRecipesId: []
        },
        {
          type: ADD_RECIPE,
          recipe: [mockRecipesReducers]
        }
      )
    ).toEqual({
      recipes: [mockRecipesReducers],
      userRecipe: [mockRecipesReducers],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    });
  });
  it('Should handle GET_USER_RECIPES action', () => {
    expect(
      recipeReducers(
        {
          favoriteRecipes: [],
          userFavoriteRecipesId: [],
          recipes: [],
          singleRecipe: ''
        },
        {
          type: GET_USER_RECIPES,
          userRecipe: mockRecipesReducers
        }
      )
    ).toEqual({
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      recipes: [],
      singleRecipe: '',
      userRecipe: mockRecipesReducers
    });
  });
});
