import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { favoriteRecipes } from '../__mocks__/actions/recipes';
import mockReducers, {
  reviews,
  recipeMock,
  singleRecipes,
  removeRecipeMock,
  favoritesRecipeMock,
  mockVotes,
  addFavoriteRecipeMock
} from '../__mocks__/reducers/mockReducers';
import recipeReducers, { recipeDefaultState } from '../../reducers/recipes';
import {
  ADD_RECIPE,
  GET_USER_RECIPES,
  EDIT_RECIPE,
  REMOVE_RECIPE,
  GET_RECIPES,
  GET_ONE_RECIPE,
  FETCH_FAVORITE_RECIPES,
  ADD_REVIEW,
  TOGGLE_FAVORITE,
  UPVOTE_RECIPE
} from '../../actions/types';

describe('Recipes Reducer', () => {
  it('Should return the initial state', () => {
    expect(recipeReducers(undefined, {})).toEqual(recipeDefaultState);
  });

  it('Should handle ADD_RECIPE action', () => {
    const stateBefore = recipeDefaultState;
    const action = {
      type: ADD_RECIPE,
      recipe: singleRecipes,
      isLoading: false
    };
    const stateAfter = { ...recipeDefaultState, userRecipe: recipeMock };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle GET_USER_RECIPES action', () => {
    const stateBefore = recipeDefaultState;
    const action = {
      type: GET_USER_RECIPES,
      userRecipe: recipeMock,
      isLoading: false
    };
    const stateAfter = { ...recipeDefaultState, userRecipe: recipeMock };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle EDIT_RECIPE action', () => {
    const stateBefore = { ...recipeDefaultState, userRecipe: recipeMock };
    const action = {
      type: EDIT_RECIPE,
      id: recipeMock.id,
      updates: recipeMock[0]
    };
    const stateAfter = { ...recipeDefaultState, userRecipe: recipeMock };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle the REMOVE_RECIPE action', () => {
    const stateBefore = { ...recipeDefaultState, userRecipe: removeRecipeMock };
    const action = {
      type: REMOVE_RECIPE,
      id: recipeMock[0].id
    };
    const stateAfter = recipeDefaultState;
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle GET_RECIPES action', () => {
    const stateBefore = recipeDefaultState;
    const action = {
      type: GET_RECIPES,
      pagination: 1,
      recipes: [recipeMock],
      isLoading: false
    };
    const stateAfter = { ...recipeDefaultState, recipes: [recipeMock] };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle GET_ONE_RECIPE action', () => {
    const stateBefore = {
      ...recipeDefaultState,
      recipes: [recipeMock, recipeMock]
    };
    const action = {
      type: GET_ONE_RECIPE,
      recipe: [recipeMock]
    };
    const stateAfter = {
      ...recipeDefaultState,
      recipes: [recipeMock, recipeMock],
      singleRecipe: recipeMock
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle FETCH_FAVORITE_RECIPES action', () => {
    const stateBefore = {
      ...recipeDefaultState,
      favoriteRecipes: [recipeMock]
    };
    const action = {
      type: FETCH_FAVORITE_RECIPES,
      favoriteRecipes: [recipeMock]
    };
    const stateAfter = { ...recipeDefaultState, favoriteRecipes: [recipeMock] };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle ADD_REVIEW action', () => {
    const stateBefore = { ...recipeDefaultState, singleRecipe: recipeMock[0] };
    const action = {
      type: ADD_REVIEW,
      review: reviews,
      isLoading: false
    };
    const stateAfter = { ...recipeDefaultState, singleRecipe: mockReducers };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should dispatch the TOGGLE_FAVORITES' +
    ' action and add recipe to favorites', () => {
      const stateBefore = { ...recipeDefaultState, recipes: removeRecipeMock };
      const action = {
        type: TOGGLE_FAVORITE,
        favoriteRecipes,
        userId: 1,
        toggleType: 'add'
      };
      const stateAfter = { ...recipeDefaultState, recipes: addFavoriteRecipeMock };
      deepFreeze(stateBefore);
      deepFreeze(action);
      const result = recipeReducers(stateBefore, action);
      expect(result.recipes[0].favorites.length).toEqual(2);
      expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
    });
  it('Should dispatch the TOGGLE_FAVORITES' +
    ' action and remove recipe from favorites', () => {
      const stateBefore = { ...recipeDefaultState, recipes: removeRecipeMock };
      const action = {
        type: TOGGLE_FAVORITE,
        favoriteRecipes,
        userId: 1,
        toggleType: 'remove'
      };
      const stateAfter = recipeDefaultState;
      deepFreeze(stateBefore);
      deepFreeze(action);
      const result = recipeReducers(stateBefore, action);
      expect(result.recipes[0].favorites.length).toEqual(1);
    });
});
