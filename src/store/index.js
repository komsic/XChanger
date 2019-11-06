import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const allStoreEnhancers = composeWithDevTools(applyMiddleware());

const store = createStore(
  rootReducer,
  undefined,
  allStoreEnhancers,
);

export default store;
