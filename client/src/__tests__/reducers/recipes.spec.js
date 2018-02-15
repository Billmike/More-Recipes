import expect from 'expect';
import { mockRecipesReducers } from '../__mocks__/actions/recipes';
import recipeReducers from '../../reducers/recipes';
import * as types from '../../actions/types';

describe('Recipes Reducer', () => {
  it('Should return the initial state', () => {
    expect(recipeReducers(undefined, {})).toEqual({
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    });
  });

  it('Should handle ADD_RECIPE action', () => {
    expect(recipeReducers(
      {
        pages: 0,
        singleRecipe: '',
        favoriteRecipes: [],
        userFavoriteRecipesId: []
      },
      {
        type: types.ADD_RECIPE,
        recipe: [mockRecipesReducers]
      }
    )).toEqual({
      pages: 0,
      recipes: [mockRecipesReducers],
      userRecipe: [mockRecipesReducers],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    });
  });
  it('Should handle GET_USER_RECIPES action', () => {
    expect(recipeReducers({
      pages: 0,
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      recipes: [],
      singleRecipe: ''
    }, {
      type: types.GET_USER_RECIPES,
      userRecipe: mockRecipesReducers
    })).toEqual({
      pages: 0,
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      recipes: [],
      singleRecipe: '',
      userRecipe: mockRecipesReducers
    });
  });
});
