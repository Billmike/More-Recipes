import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import recipesReducer from '../reducers/recipes';

export default () => {
  const store = createStore(
    combineReducers({
      recipes: recipesReducer,
    }),
    compose(applyMiddleware(thunk)),
  );

  return store;
};

