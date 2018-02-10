import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import recipesReducer from '../reducers/recipes';
import authReducer from '../reducers/auth';

const middleWare = [];

middleWare.push(thunk);

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});
middleWare.push(loggerMiddleware);


export default () => {
  const store = createStore(
    combineReducers({
      recipes: recipesReducer,
      auth: authReducer
    }),
    compose(
      applyMiddleware(...middleWare),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
  );

  return store;
};

