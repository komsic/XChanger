import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const saga = createSagaMiddleware();
const allStoreEnhancers = composeWithDevTools(applyMiddleware(saga));

const store = createStore(
  rootReducer,
  undefined,
  allStoreEnhancers,
);

saga.run(rootSaga);

export default store;
