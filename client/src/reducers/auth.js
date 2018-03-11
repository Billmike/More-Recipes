import { isEmpty } from 'lodash';
import { SET_CURRENT_USER, GET_USER_INFORMATION } from '../actions/types';

export const initialState = {
  isAuthenticated: !!localStorage.getItem('authToken'),
  userDetails: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        userDetails: action.user,
        user: action.user
      };
    case GET_USER_INFORMATION:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        userDetails: action.user
      };
    default:
      return state;
  }
};
