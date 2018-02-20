import expect from 'expect';
import deepFreeze from 'deep-freeze';
import mockReducers, {
  reviews,
  recipeMock
} from '../__mocks__/reducers/mockReducers';
import recipeReducers from '../../reducers/recipes';
import {
  ADD_RECIPE,
  GET_USER_RECIPES,
  EDIT_RECIPE,
  REMOVE_RECIPE,
  GET_RECIPES,
  GET_ONE_RECIPE,
  FETCH_FAVORITE_RECIPES,
  ADD_REVIEW
} from '../../actions/types';

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
    const stateBefore = {
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    const action = {
      type: ADD_RECIPE,
      recipe: [recipeMock]
    };
    const stateAfter = {
      pages: 0,
      recipes: [recipeMock],
      userRecipe: [recipeMock],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle GET_USER_RECIPES action', () => {
    const stateBefore = {
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    const action = {
      type: GET_USER_RECIPES,
      userRecipe: recipeMock
    };
    const stateAfter = {
      pages: 0,
      recipes: [],
      userRecipe: recipeMock,
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle EDIT_RECIPE action', () => {
    const stateBefore = {
      pages: 0,
      recipes: [],
      userRecipe: [recipeMock],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    const action = {
      type: EDIT_RECIPE,
      updates: recipeMock
    };
    const stateAfter = {
      pages: 0,
      recipes: [],
      userRecipe: [recipeMock],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle the REMOVE_RECIPE action', () => {
    const stateBefore = {
      pages: 0,
      recipes: [recipeMock],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    const action = {
      type: REMOVE_RECIPE,
      id: recipeMock.id
    };
    const stateAfter = {
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle GET_RECIPES action', () => {
    const stateBefore = {
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    const action = {
      type: GET_RECIPES,
      pagination: 0,
      recipes: [recipeMock]
    };
    const stateAfter = {
      pages: 0,
      recipes: [recipeMock],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle GET_ONE_RECIPE action', () => {
    const stateBefore = {
      pages: 0,
      recipes: [recipeMock, recipeMock],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    const action = {
      type: GET_ONE_RECIPE,
      recipe: recipeMock
    };
    const stateAfter = {
      pages: 0,
      recipes: [recipeMock, recipeMock],
      userRecipe: [],
      singleRecipe: recipeMock,
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle FETCH_FAVORITE_RECIPES action', () => {
    const stateBefore = {
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [recipeMock],
      userFavoriteRecipesId: []
    };
    const action = {
      type: FETCH_FAVORITE_RECIPES,
      favoriteRecipes: [recipeMock]
    };
    const stateAfter = {
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [recipeMock],
      userFavoriteRecipesId: []
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle ADD_REVIEW action', () => {
    const stateBefore = {
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: recipeMock,
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    const action = {
      type: ADD_REVIEW,
      review: reviews
    };
    const stateAfter = {
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: mockReducers,
      favoriteRecipes: [],
      userFavoriteRecipesId: []
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
});
