import expect from 'expect';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import { SET_CURRENT_USER } from '../../actions/types';
import { signupRequest } from '../../actions/userSignupAction';
import { signinRequest, logout } from '../../actions/signinRequest';
import mockData from '../__mocks__/actions/auth';
import mockLocalStorage from '../__mocks__/localStorage';

const mockStore = configureStore([thunk]);

window.localStorage = mockLocalStorage;

describe('Authentication action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Signup action', () => {
    it('Should sign up a user and dispatch the SET_CURRENT_USER action', async (done) => {
      const { usersignupData, Response } = mockData;
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: Response
        });
      });
      const returnedAction = [
        {
          type: SET_CURRENT_USER,
          user: jwt.decode(Response.token)
        }
      ];
      const store = mockStore({});
      await store.dispatch(signupRequest(usersignupData));
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });
  describe('Signin Action', () => {
    it('Should sign in a registered user and dispatch SET_CURRENT_USER action', async (done) => {
      const { userSigninData, Response } = mockData;
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: Response
        });
      });
      const returnedAction = [
        {
          type: SET_CURRENT_USER,
          user: jwt.decode(Response.token)
        }
      ];
      const store = mockStore({});
      await store.dispatch(signinRequest(userSigninData));
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });
  describe('Sign out Action', () => {
    it('Should signout a user and clear their information', async (done) => {
      const returnedAction = [
        {
          type: SET_CURRENT_USER,
          user: {}
        }
      ];
      const store = mockStore({});
      await store.dispatch(logout({}));
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });
});
