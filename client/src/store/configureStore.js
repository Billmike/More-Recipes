import { createStore, combineReducers } from 'redux';
import recipesReducer from '../reducers/recipes';

export default () => {
  const store = createStore(combineReducers({
    recipes: recipesReducer,
  }));

  return store;
};

