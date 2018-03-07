import React from 'react';
import { render } from 'react-dom';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';
import setAuthToken from './utils/setAuthToken';
import { addRecipe, startGetAllRecipes } from './actions/recipes';
import { SET_CURRENT_USER } from './actions/types';
import { setCurrentUser } from './actions/signinRequest';

const store = configureStore();

render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
