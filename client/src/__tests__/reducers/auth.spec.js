import localStorage from 'mock-local-storage';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { SET_CURRENT_USER, GET_USER_INFORMATION } from '../../actions/types';
import authReducer, { initialState } from '../../reducers/auth';
import { authUser } from '../fixtures/authUser';

global.window = {};
window.localStorage = global.localStorage;

describe('Auth Reducer', () => {
  it('Should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });
  it('Should set the current user in the store', () => {
    const stateBefore = initialState;
    const action = {
      type: SET_CURRENT_USER,
      user: authUser
    };
    const stateAfter = {
      isAuthenticated: true,
      user: authUser,
      userDetails: authUser
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(authReducer(stateBefore, action)).toEqual(stateAfter);
  });
  it('Should fetch the details of a logged-in user', () => {
    const stateBefore = initialState;
    const action = {
      type: GET_USER_INFORMATION,
      user: authUser
    };
    const stateAfter = {
      isAuthenticated: true,
      userDetails: authUser
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(authReducer(stateBefore, action)).toEqual(stateAfter);
  });
});
