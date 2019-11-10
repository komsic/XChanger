import { combineReducers } from 'redux';
import currencyReducer from './currency';
import uiReducer from './ui';

const rootReducer = combineReducers({
  currencyState: currencyReducer,
  uiState: uiReducer,
});

export default rootReducer;
