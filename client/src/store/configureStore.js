import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import recipesReducer from '../reducers/recipes';
import authReducer from '../reducers/auth';

export default () => {
  const store = createStore(
    combineReducers({
      recipes: recipesReducer,
      auth: authReducer
    }),
    compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
  );

  return store;
};

