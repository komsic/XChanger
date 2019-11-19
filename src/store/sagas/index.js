import { takeEvery, all } from 'redux-saga/effects';
import { CURRENCY_RATE_FETCH } from '../actionTypes';
import handleFetchRate from './currency';

function* watchAll() {
  yield all([
    takeEvery(CURRENCY_RATE_FETCH, handleFetchRate),
  ]);
}

export default watchAll;
