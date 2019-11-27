import { call, put } from 'redux-saga/effects';
import fetchRates from '../api/currency';
import { doAddRates, doSetLoadingStatus, doFetchError } from '../actions/currency';

function* handleFetchRate({ baseCurrency: bc, selectedCurrencies: sc }) {
  try {
    const ss = doSetLoadingStatus(bc, sc);
    yield put(ss);

    const { baseCurrency, selectedCurrencies } = ss;
    if (baseCurrency && selectedCurrencies.length > 0) {
      const result = yield call(fetchRates, {
        baseCurrency: baseCurrency.code,
        selectedCurrencies: selectedCurrencies.map(({ code }) => code),
      });

      yield put(doAddRates(result.rates));
    }
  } catch (error) {
    yield put(doFetchError(error.message));
  }
}

export default handleFetchRate;
