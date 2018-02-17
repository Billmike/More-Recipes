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

  describe('Signup Action', () => {
    it('Should signup a user and call the SET_CURRENT_USER action', async (done) => {
      const { usersignupData, signupResponse } = mockData;
      moxios.stubRequest('/api/v1/users/signup', {
        status: 201,
        response: signupResponse
      });

      const returnedAction = [{
        type: SET_CURRENT_USER,
        user: jwt.decode(signupResponse.token)
      }];

      const store = mockStore({});
      await store.dispatch(signupRequest(usersignupData))
        .then(() => {
          expect(store.getActions()).toEqual(returnedAction);
        });
      done();
    });
  });

  describe('Signin Action', () => {
    it('Should signin a user and call SET_CURRENT_USER action',
      async (done) => {
        const { userSigninData, signupResponse } = mockData;
        moxios.stubRequest('/api/v1/users/signin', {
          status: 201,
          response: signupResponse
        });

        const returnedAction = [{
          type: SET_CURRENT_USER,
          user: jwt.decode(signupResponse.token)
        }];

        const store = mockStore({});
        await store.dispatch(signinRequest(userSigninData))
          .then(() => {
            expect(store.getActions()).toEqual(returnedAction);
          });
        done();
      }
    );
  });

  describe('Logout Action', () => {
    it('Should logout a user and clear their information', async (done) => {
      const returnedAction = [{
        type: SET_CURRENT_USER,
        user: {}
      }];
      const store = mockStore({});
      await store.dispatch(logout({}));
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });
});
