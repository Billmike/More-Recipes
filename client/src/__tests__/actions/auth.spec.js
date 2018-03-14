import expect from 'expect';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import instance from '../../utils/axios';
import {
  SET_CURRENT_USER, GET_USER_INFORMATION, SIGNUP_REQUEST, GET_USER_REQUEST
} from '../../actions/types';
import { signupRequest } from '../../actions/userSignupAction';
import {
  signinRequest, logout, getUserinfo
} from '../../actions/signinRequest';
import mockData from '../__mocks__/actions/auth';
import mockLocalStorage from '../__mocks__/localStorage';

const mockStore = configureStore([thunk]);

window.localStorage = mockLocalStorage;

describe('Authentication action', () => {
  beforeEach(() => moxios.install(instance));
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
          type: SIGNUP_REQUEST,
          isLoading: true
        },
        {
          type: SET_CURRENT_USER,
          user: jwt.decode(Response.token),
          isLoading: false
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
          user: jwt.decode(Response.token),
          isLoading: false
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
          user: {},
          isLoading: false
        }
      ];
      const store = mockStore({});
      await store.dispatch(logout({}));
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });
  describe('Get user action', () => {
    it('Should fetch the details of a signed in user', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData.userSigninData
        });
      });
      const returnedAction = [
        {
          type: GET_USER_REQUEST,
          isLoading: true
        },
        {
          type: GET_USER_INFORMATION,
          user: mockData.userSigninData,
          isLoading: false
        }
      ];
      const store = mockStore({});
      await store.dispatch(getUserinfo());
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });
});
