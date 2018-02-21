import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';
import setAuthToken from './utils/setAuthToken';
import { addRecipe, startGetAllRecipes } from './actions/recipes';
import { SET_CURRENT_USER } from './actions/types';
import { setCurrentUser } from './actions/signinRequest';

const store = configureStore();

if (localStorage.authToken) {
  setAuthToken(localStorage.authToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.authToken)));
}

ReactDOM
.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
