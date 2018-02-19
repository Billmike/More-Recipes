import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
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
  startUpvoteRecipe,
  startDownVoteRecipe
} from '../../actions/recipes';
import {
  recipeResponse,
  deleteRecipeResponse,
  mockFavoriteRecipes
} from '../__mocks__/actions/recipes';
import voteResponse from '../__mocks__/actions/votes';
import {
  ADD_RECIPE,
  EDIT_RECIPE,
  REMOVE_RECIPE,
  GET_RECIPES,
  GET_ONE_RECIPE,
  GET_USER_RECIPES,
  FETCH_FAVORITE_RECIPES,
  TOGGLE_FAVORITE,
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE
} from '../../actions/types';

const mockStore = configureStore([thunk]);

describe('Recipes actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Create recipe Action', () => {
    it('Should create a recipe and dispatch the ADD_RECIPE action', async (done) => {
      moxios.stubRequest('/api/v1/recipes', {
        status: 201,
        response: recipeResponse
      });

      const returnedAction = [
        {
          type: ADD_RECIPE,
          recipe: recipeResponse.recipeData
        }
      ];

      const store = mockStore({});
      await store.dispatch(startAddRecipe({ ...recipeResponse.recipeData }));
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });

  describe('Edit recipe action', () => {
    it('Should edit a recipe and dispatch the EDIT_RECIPE action', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: recipeResponse
        });
      });
      const returnedAction = [
        {
          type: EDIT_RECIPE,
          updates: recipeResponse.recipeData
        }
      ];
      const store = mockStore({});
      await store.dispatch(startEditRecipe({ ...recipeResponse.recipeData }));
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });

  describe('Delete recipe action', () => {
    it('Should delete recipe and dispatch the REMOVE_RECIPE action', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: deleteRecipeResponse
        });
      });

      const returnedAction = [
        {
          type: REMOVE_RECIPE,
          id: recipeResponse.id
        }
      ];

      const store = mockStore({});
      await store.dispatch(startRemoveRecipe(recipeResponse.id));
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });

  describe('Get All recipes Action', () => {
    it('Should fetch all recipes in the application and dispatch the GET_RECIPES action', async (done) => {
      const allRecipes = {
        recipeData: [recipeResponse.recipeData, recipeResponse.recipeData]
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: allRecipes
        });
      });
      const returnedAction = [
        {
          type: GET_RECIPES,
          recipes: allRecipes.recipeData
        }
      ];
      const store = mockStore({});
      await store.dispatch(startGetAllRecipes());
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });

  describe('Get one recipe action', () => {
    it('Should fetch on recipe from the application and dispatch the GET_ONE_RECIPE action', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeResponse
        });
      });
      const returnedAction = [
        {
          type: GET_ONE_RECIPE,
          recipe: recipeResponse.recipeData
        }
      ];
      const store = mockStore({});
      await store.dispatch(startGetOneRecipe());
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });

  describe("Get user's recipe action", () => {
    it("Should return the user's recipe and dispatch the GET_USER_RECIPES action", async (done) => {
      const userRecipes = {
        userRecipe: [recipeResponse.recipeData, recipeResponse.recipeData]
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: userRecipes
        });
      });
      const returnedAction = [
        {
          type: GET_USER_RECIPES,
          userRecipe: userRecipes.userRecipe
        }
      ];
      const store = mockStore({});
      await store.dispatch(startGetUserRecipes());
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });

  describe('Get user favorites action', () => {
    it("Should get user's favorite and dispatch the FETCH_FAVORITE_RECIPES", async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeResponse
        });
      });
      const returnedAction = [
        {
          type: FETCH_FAVORITE_RECIPES,
          favoriteRecipes: mockFavoriteRecipes
        }
      ];
      const store = mockStore({});
      await store.dispatch(startGetUserFavorites());
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });

  describe('Toggle favorites action', () => {
    it("Should add/remove from a user's favorite list and dispatch the TOGGLE_FAVORITE action", async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeResponse
        });
      });
      const returnedAction = [
        {
          type: TOGGLE_FAVORITE,
          favoriteRecipes: mockFavoriteRecipes,
          toggleType: 'add'
        }
      ];
      const store = mockStore({ auth: { user: { token: '' } } });
      await store.dispatch(startAddFavoriteRecipes());
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });

  describe('Should upvote a recipe', () => {
    it('Should upvote a recipe and dispatch the UPVOTE_RECIPE action', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: voteResponse.votedRecipe.recipeId
        });
      });
      const returnedAction = [
        {
          type: UPVOTE_RECIPE,
          id: voteResponse.votedRecipe.recipeId
        }
      ];
      const store = mockStore({ auth: { user: { token: '' } } });
      await store.dispatch(startUpvoteRecipe({}));
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });
});
