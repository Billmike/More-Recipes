import { createStore, combineReducers } from 'redux';
import recipesReducer from '../reducers/recipes';

export default () => {
  const store = createStore(combineReducers({
    recipes: recipesReducer,
  }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return store;
};

