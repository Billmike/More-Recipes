import { isEmpty } from 'lodash';
import { SET_CURRENT_USER, GET_USER_INFORMATION } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  userDetails: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case GET_USER_INFORMATION:
    console.log('user info meeee', action);
      return {
        ...state,
        userDetails: action.user
      };
    default:
      return state;
  }
};
