import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';
import setAuthToken from './utils/setAuthToken';
import { addRecipe } from './actions/recipes';
import { SET_CURRENT_USER } from './actions/types';
import { setCurrentUser } from './actions/signinRequest';

const store = configureStore();

store.subscribe(() => {
  store.getState();
});

store.dispatch(addRecipe({
  name: 'Fried Rice',
  description: 'Awesome rice',
  category: 'Lunch',
  ingredients: ['Awesome', 'Love'],
  instructions: ['Me cook the shiit wella man.'],
}));
store.dispatch(addRecipe({
  name: 'Jollof Maize',
  description: 'Sweet Jollof',
  category: 'Breakfast',
  ingredients: ['Rice', 'Beans'],
  instructions: ['Make the food awesome', 'Put it on fire before you cook me well.'],
}));

if (localStorage.authToken) {
  setAuthToken(localStorage.authToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.authToken)));
}

ReactDOM
  .render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'));
