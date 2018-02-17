import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import {
  startAddRecipe,
  startEditRecipe,
  startRemoveRecipe,
  startGetAllRecipes,
  startGetOneRecipe,
  startGetUserRecipes,
  startGetUserFavorites,
  startAddFavoriteRecipes,
} from '../../actions/recipes';
import {
  recipeResponse,
  deleteRecipeResponse,
  mockFavoriteRecipes,
} from '../__mocks__/actions/recipes';
import {
  ADD_RECIPE,
  EDIT_RECIPE,
  REMOVE_RECIPE,
  GET_RECIPES,
  GET_ONE_RECIPE,
  GET_USER_RECIPES,
  FETCH_FAVORITE_RECIPES,
  ADD_FAVORITE_RECIPE,
} from '../../actions/types';

const mockStore = configureMockStore([thunk]);

describe('Recipes action creators', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Create Recipe Action', () => {
    it('Should dispatch ADD_RECIPE action and add a recipe', async (done) => {
      moxios.stubRequest('/api/v1/recipes', {
        status: 201,
        response: recipeResponse
      });
      const returnedAction = [{
        type: ADD_RECIPE,
        recipe: recipeResponse.recipeData
      }];

      const store = mockStore({});
      await store.dispatch(startAddRecipe({
        ...recipeResponse.recipeData
      }))
        .then(() => {
          expect(store.getActions()).toEqual(returnedAction);
        });
      done();
    });
  });

  describe('Edit recipe Action', () => {
    it('Should edit a recipe and call the EDIT_RECIPE action', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: recipeResponse
        });
      });

      const returnedAction = [{
        type: EDIT_RECIPE,
        updates: recipeResponse.recipeData
      }];

      const store = mockStore({});
      return store.dispatch(startEditRecipe({ ...recipeResponse.recipeData }))
        .then(() => {
          expect(store.getActions()).toEqual(returnedAction);
        });
    });
  });

  describe('Delete recipe Action', () => {
    it('Should delete a recipe and dispatch the REMOVE_RECIPE action', () => {
      moxios.wait(() => {
        const deleteRequest = moxios.requests.mostRecent();
        deleteRequest.respondWith({
          status: 201,
          response: deleteRecipeResponse
        });
      });

      const returnedAction = [{
        type: REMOVE_RECIPE,
        id: recipeResponse.id
      }];

      const store = mockStore({});
      return store.dispatch(startRemoveRecipe(recipeResponse.id))
        .then(() => {
          expect(store.getActions()).toEqual(returnedAction);
        });
    });
  });

  describe('Get all recipes action', () => {
    it('Should fetch all the recipes in the app and dispatch the GET_RECIPES action',
      () => {
        const allRecipes = {
          recipeData: [recipeResponse.recipeData, recipeResponse.recipeData]
        };
        moxios.wait(() => {
          const getRecipesRequest = moxios.requests.mostRecent();
          getRecipesRequest.respondWith({
            status: 201,
            response: allRecipes
          });
        });

        const returnedAction = [{
          type: GET_RECIPES,
          recipes: allRecipes.recipeData
        }];

        const store = mockStore({});
        return store.dispatch(startGetAllRecipes())
          .then(() => {
            expect(store.getActions()).toEqual(returnedAction);
          });
      });
  });

  describe('Get one recipe action', () => {
    it('Should fetch one recipe from the application and dispatch the GET_ONE_RECIPE action',
      () => {
        moxios.wait(() => {
          const getRecipeResponse = moxios.requests.mostRecent();
          getRecipeResponse.respondWith({
            status: 201,
            response: recipeResponse
          });
        });

        const returnedAction = [{
          type: GET_ONE_RECIPE,
          recipe: recipeResponse.recipeData
        }];

        const store = mockStore({});
        return store.dispatch(startGetOneRecipe())
          .then(() => {
            expect(store.getActions()).toEqual(returnedAction);
          });
      }
    );
  });

  describe('Get user recipe action', () => {
    it('Should fetch a user\'s recipe from the application', () => {
      const userRecipes = {
        userRecipe: [recipeResponse.recipeData, recipeResponse.recipeData]
      };
      moxios.wait(() => {
        const getUserRecipeRequest = moxios.requests.mostRecent();
        getUserRecipeRequest.respondWith({
          status: 201,
          response: userRecipes
        });
      });

      const returnedAction = [{
        type: GET_USER_RECIPES,
        userRecipe: userRecipes.userRecipe
      }];

      const store = mockStore({});
      return store.dispatch(startGetUserRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(returnedAction);
        });
    });
  });

  describe('Get favorite recipes action', () => {
    it('Should return the favorite recipes of a user and dispatch the FETCH_FAVORITE_RECIPES action',
      () => {
        moxios.wait(() => {
          const getFavoritesRequest = moxios.requests.mostRecent();
          getFavoritesRequest.respondWith({
            status: 201,
            response: recipeResponse
          });
        });

        const returnedAction = [{
          type: FETCH_FAVORITE_RECIPES,
          favoriteRecipes: mockFavoriteRecipes
        }];

        const store = mockStore({});
        return store.dispatch(startGetUserFavorites())
          .then(() => {
            expect(store.getActions()).toEqual(returnedAction);
          });
      }
    );
  });

  describe('Add favorite recipe action', () => {
    it('Should add or remove user favorite and dispatch ADD_FAVORITE_RECIPE action', () => {
      moxios.wait(() => {
        const addFavsResponse = moxios.requests.mostRecent();
        addFavsResponse.respondWith({
          status: 201,
          response: recipeResponse
        });
      });

      const returnedAction = [{
        type: ADD_FAVORITE_RECIPE,
        favoriteRecipes: mockFavoriteRecipes
      }];

      const store = mockStore({});
      return store.dispatch(startAddFavoriteRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(returnedAction);
        });
    });
  });

});
