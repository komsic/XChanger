import { combineReducers } from 'redux';
import currencyReducer from './currency';

const rootReducer = combineReducers({
  currencyState: currencyReducer,
});

export default rootReducer;
