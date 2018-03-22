import moxios from 'moxios';
import thunk from 'redux-thunk';
import toastr from 'toastr';
import configureStore from 'redux-mock-store';
import expect from 'expect';
import instance from '../../utils/axios';
import localStorage from '../__mocks__/localStorage';
import {
  addRecipeAction,
  editRecipeAction,
  removeRecipeAction,
  getAllRecipesAction,
  getOneRecipeAction,
  getPopularRecipes,
  getUserRecipesAction,
  getUserFavoritesAction,
  addFavoriteRecipesAction,
  upvoteRecipeAction,
  downVoteRecipeAction,
  addReviewAction,
  searchRecipesAction
} from '../../actions/recipes';
import {
  editRecipeResponse,
  recipeResponse,
  deleteRecipeResponse,
  mockFavoriteRecipes
} from '../__mocks__/actions/recipes';
import { reviews } from '../__mocks__/reducers/mockReducers';
import voteResponse, { downVoteResponse } from '../__mocks__/actions/votes';
import {
  ADD_RECIPE,
  EDIT_RECIPE,
  REMOVE_RECIPE,
  GET_RECIPES,
  GET_ONE_RECIPE,
  GET_USER_RECIPES,
  POPULAR_RECIPES,
  FETCH_FAVORITE_RECIPES,
  TOGGLE_FAVORITE,
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE,
  ADD_REVIEW,
  SEARCH_RECIPES,
  ADD_RECIPE_REQUEST,
  GET_RECIPES_REQUEST,
  ADD_REVIEW_REQUEST,
  GET_USER_RECIPES_REQUEST
} from '../../actions/types';

const mockStore = configureStore([thunk]);

window.localStorage = localStorage;

toastr.success = jest.fn();

describe('Recipes actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall());

  describe('Create recipe Action', () => {
    it('Should create a recipe and dispatch' +
      ' the ADD_RECIPE action', async () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 201,
            response: recipeResponse
          });
        });

        const returnedAction = [
          {
            type: ADD_RECIPE_REQUEST,
            isLoading: true
          },
          {
            type: ADD_RECIPE,
            recipe: recipeResponse,
            isLoading: false
          }
        ];

        const store = mockStore({});
        await store.dispatch(addRecipeAction({ ...recipeResponse.recipeData }));
        expect(store.getActions()).toEqual(returnedAction);
      });
  });

  describe('Edit recipe action', () => {
    it(
      'Should edit a recipe and dispatch the EDIT_RECIPE action',
      async () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 201,
            response: editRecipeResponse
          });
        });
        const returnedAction = [
          {
            type: EDIT_RECIPE,
            id: editRecipeResponse.recipeData.id,
            updates: editRecipeResponse.recipeData
          }
        ];
        const store = mockStore({});
        await store.dispatch(editRecipeAction(editRecipeResponse
          .recipeData.id, editRecipeResponse.recipeData));
        expect(store.getActions()).toEqual(returnedAction);
      }
    );
  });

  describe('Delete recipe action', () => {
    it(
      'Should delete recipe and dispatch the REMOVE_RECIPE action',
      async () => {
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
        await store.dispatch(removeRecipeAction(recipeResponse.id));
        expect(store.getActions()).toEqual(returnedAction);
      }
    );
  });

  describe('Get All recipes Action', () => {
    it(
      `Should fetch all recipes in the
 application and dispatch the GET_RECIPES action`,
      async () => {
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
            type: GET_RECIPES_REQUEST,
            isLoading: true
          },
          {
            type: GET_RECIPES,
            recipes: allRecipes.recipeData,
            isLoading: false
          }
        ];
        const store = mockStore({});
        await store.dispatch(getAllRecipesAction());
        expect(store.getActions()).toEqual(returnedAction);
      }
    );
  });

  describe('Get one recipe action', () => {
    it(
      `Should fetch on recipe from the
 application and dispatch the GET_ONE_RECIPE action`,
      async () => {
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
        await store.dispatch(getOneRecipeAction());
        expect(store.getActions()).toEqual(returnedAction);
      }
    );
  });

  describe("Get user's recipe action", () => {
    it(
      'Should return the users recipe and dispatch the GET_USER_RECIPES action',
      async () => {
        const userRecipes = {
          recipeData: [recipeResponse.recipeData, recipeResponse.recipeData]
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
            type: GET_USER_RECIPES_REQUEST,
            isLoading: true
          },
          {
            type: GET_USER_RECIPES,
            userRecipe: userRecipes.recipeData,
            isLoading: false
          }
        ];
        const store = mockStore({});
        await store.dispatch(getUserRecipesAction());
        expect(store.getActions()).toEqual(returnedAction);
      }
    );
  });

  describe('Get user favorites action', () => {
    it(
      'Should get users favorite and dispatch the FETCH_FAVORITE_RECIPES',
      async () => {
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
        await store.dispatch(getUserFavoritesAction());
        expect(store.getActions()).toEqual(returnedAction);
      }
    );
  });

  describe('Toggle favorites action', () => {
    it(
      `Should add/remove from a users favorite
 list and dispatch the TOGGLE_FAVORITE action`,
      async () => {
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
        const store = mockStore({ auth: { userDetails: { token: '' } } });
        await store.dispatch(addFavoriteRecipesAction());
        expect(store.getActions()).toEqual(returnedAction);
      }
    );
  });

  describe('Should upvote a recipe', () => {
    it(
      'Should upvote a recipe and dispatch the UPVOTE_RECIPE action',
      async (done) => {
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
        const store = mockStore({ auth: { userDetails: { token: '' } } });
        await store.dispatch(upvoteRecipeAction({}));
        expect(store.getActions()).toEqual(returnedAction);
        done();
      }
    );
  });

  describe('Should downvote a recipe', () => {
    it(
      'Should downvote a recipe and dispatch the DOWNVOTE_RECIPE action',
      async () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: voteResponse.votedRecipe.recipeId
          });
        });
        const returnedAction = [
          {
            type: DOWNVOTE_RECIPE,
            id: voteResponse.votedRecipe.recipeId
          }
        ];
        const store = mockStore({ auth: { userDetails: { token: '' } } });
        await store.dispatch(downVoteRecipeAction({}));
        expect(store.getActions()).toEqual(returnedAction);
      });
  });

  describe('Review a recipe', () => {
    it(
      'Should add review to a recipe and dispatch the ADD_REVIEW action',
      async () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: reviews
          });
        });
        const returnedAction = [
          {
            type: ADD_REVIEW_REQUEST,
            isLoading: true
          },
          {
            type: ADD_REVIEW,
            review: reviews,
            isLoading: false
          }
        ];
        const store = mockStore({});
        await store.dispatch(addReviewAction({}));
        expect(store.getActions()).toEqual(returnedAction);
      });
  });

  describe('Fetch popular recipes', () => {
    it(
      `Should fetch the popular recipes
 and dispatch the POPULAR_RECIPES action`,
      async () => {
        const popularRecipes = {
          theFoundrecipes: [recipeResponse
            .recipeData, recipeResponse.recipeData]
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: popularRecipes
          });
        });
        const returnedAction = [{
          type: POPULAR_RECIPES,
          recipe: popularRecipes
        }];
        const store = mockStore({});
        await store.dispatch(getPopularRecipes({}));
        expect(store.getActions()).toEqual(returnedAction);
      }
    );
  });
  describe('Search recipes catalogue', () => {
    it(
      `Should search the recipe catlogue
 and return a set of recipes matching the query`,
      async (done) => {
        const popularRecipes = {
          theFoundrecipes: [recipeResponse
            .recipeData, recipeResponse.recipeData]
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: popularRecipes
          });
        });
        const returnedAction = [
          {
            type: SEARCH_RECIPES,
            recipes: popularRecipes,
          }
        ];
        const store = mockStore({});
        await store.dispatch(searchRecipesAction('Fried rice', 1));
        expect(store.getActions()).toEqual(returnedAction);
        done();
      }
    );
  });
  describe('Action errors', () => {
    it('Should handle ADD_RECIPE error', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 400,
          response: {
            data: {
              message: 'Error occurred'
            }
          }
        });
      });
      const returnedAction = [
        {
          type: ADD_RECIPE_REQUEST,
          isLoading: true
        },
        {
          type: ADD_RECIPE,
          recipe: recipeResponse,
          isLoading: false
        }
      ];
      const store = mockStore({});
      await store.dispatch(addRecipeAction({ ...recipeResponse }));
      expect(store.getActions())
        .toEqual([{ isLoading: true, type: ADD_RECIPE_REQUEST }]);
      done();
    });
    it('Should handle EDIT_RECIPE error', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 400,
          response: {
            data: {
              message: 'Error occurred'
            }
          }
        });
      });
      const returnedAction = [
        {
          type: EDIT_RECIPE,
          id: editRecipeResponse.recipeData.id,
          updates: editRecipeResponse.recipeData
        }
      ];
      const store = mockStore({});
      await store.dispatch(editRecipeAction(editRecipeResponse
        .recipeData.id, editRecipeResponse.recipeData));
      expect(store.getActions()).toEqual([]);
      done();
    });
    it('Should handle DELETE_RECIPE error', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 400,
          response: {
            data: {
              message: 'Error occurred'
            }
          }
        });
      });
      const returnedAction = [
        {
          type: EDIT_RECIPE,
          id: recipeResponse.id
        }
      ];
      const store = mockStore({});
      await store.dispatch(removeRecipeAction(recipeResponse.id));
      expect(store.getActions()).toEqual([]);
      done();
    });
    it('Should handle search error', async () => {
      const popularRecipes = {
        theFoundrecipes: [recipeResponse
          .recipeData, recipeResponse.recipeData]
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 401,
          response: {
            data: {
              message: 'Error occurred'
            }
          }
        });
      });
      const returnedAction = [
        {
          type: SEARCH_RECIPES,
          recipes: popularRecipes,
        }
      ];
      const store = mockStore({});
      await store.dispatch(searchRecipesAction());
      expect(store.getActions()).toEqual([]);
    });
    it('Should handle the fetch all recipes error', async () => {
      const allRecipes = {
        recipeData: [recipeResponse.recipeData, recipeResponse.recipeData]
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: {
            data: {
              message: 'Error occurred'
            }
          }
        });
      });
      const returnedAction = [
        {
          type: GET_RECIPES_REQUEST,
          isLoading: true
        },
        {
          type: GET_RECIPES,
          recipes: allRecipes.recipeData,
          isLoading: false
        }
      ];
      const store = mockStore({});
      await store.dispatch(getAllRecipesAction());
      expect(store.getActions())
        .toEqual([{ isLoading: true, type: GET_RECIPES_REQUEST }]);
    });
  });
});
