import expect from 'expect';
import deepFreeze from 'deep-freeze';
import mockReducers, {
  reviews,
  recipeMock,
  singleRecipes,
  removeRecipeMock,
  favoritesRecipeMock,
  mockVotes
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
    expect(recipeReducers(undefined, {})).toEqual({
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      popularRecipes: []
    });
  });

  it('Should handle ADD_RECIPE action', () => {
    const stateBefore = {
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      popularRecipes: []
    };
    const action = {
      type: ADD_RECIPE,
      recipe: singleRecipes
    };
    const stateAfter = {
      pages: 0,
      recipes: [],
      userRecipe: recipeMock,
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      popularRecipes: []
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
      userFavoriteRecipesId: [],
      popularRecipes: []
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
      userFavoriteRecipesId: [],
      popularRecipes: []
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle EDIT_RECIPE action', () => {
    const stateBefore = {
      pages: 0,
      recipes: [],
      userRecipe: recipeMock,
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      popularRecipes: []
    };
    const action = {
      type: EDIT_RECIPE,
      id: recipeMock.id,
      updates: recipeMock[0]
    };
    const stateAfter = {
      pages: 0,
      recipes: [],
      userRecipe: recipeMock,
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      popularRecipes: []
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should handle the REMOVE_RECIPE action', () => {
    const stateBefore = {
      pages: 0,
      recipes: [],
      userRecipe: removeRecipeMock,
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      popularRecipes: []
    };
    const action = {
      type: REMOVE_RECIPE,
      id: recipeMock[0].id
    };
    const stateAfter = {
      pages: 0,
      recipes: [],
      userRecipe: [],
      singleRecipe: '',
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      popularRecipes: []
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
      userFavoriteRecipesId: [],
      popularRecipes: []
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
      userFavoriteRecipesId: [],
      popularRecipes: []
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
      userFavoriteRecipesId: [],
      popularRecipes: []
    };
    const action = {
      type: GET_ONE_RECIPE,
      recipe: [recipeMock]
    };
    const stateAfter = {
      pages: 0,
      recipes: [recipeMock, recipeMock],
      userRecipe: [],
      singleRecipe: recipeMock,
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      popularRecipes: []
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
      userFavoriteRecipesId: [],
      popularRecipes: []
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
      userFavoriteRecipesId: [],
      popularRecipes: []
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
      singleRecipe: recipeMock[0],
      favoriteRecipes: [],
      userFavoriteRecipesId: [],
      popularRecipes: []
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
      userFavoriteRecipesId: [],
      popularRecipes: []
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  });
  // it('Should handle up-voting a recipe and dispatch the UPVOTE-RECIPE action', () => {
  //   const stateBefore = { ...recipeDefaultState, singleRecipe: mockVotes };
  //   const action = {
  //     type: UPVOTE_RECIPE,
  //     id: mockReducers.id
  //   };
  //   const stateAfter = { ...recipeDefaultState, singleRecipe: mockVotes };
  //   deepFreeze(stateBefore);
  //   deepFreeze(action);
  //   expect(recipeReducers(stateBefore, action)).toEqual(stateAfter);
  // });
});
