import {
  doRemoveCurrency, doSetLoadingStatus, doAddRates, doFetchError,
} from './currency';
import {
  CURRENCY_LIST_REMOVE, CURRENCY_LOADING_STATUS, CURRENCY_RATE_ADD, CURRENCY_RATE_FETCH_ERROR,
} from '../actionTypes';

describe('currency action creators tests', () => {
  it('should return currency remove action given the currency name', () => {
    expect(doRemoveCurrency('name')).toEqual({
      name: 'name',
      type: CURRENCY_LIST_REMOVE,
    });
  });

  it('should return currency add action given the rates', () => {
    const rates = { NGN: 1, USD: 2 };
    expect(doAddRates(rates)).toEqual({
      rates,
      type: CURRENCY_RATE_ADD,
    });
  });

  it('should return currency add action given the rates', () => {
    const error = 'i am inevitable';
    expect(doFetchError(error)).toEqual({
      error,
      type: CURRENCY_RATE_FETCH_ERROR,
    });
  });

  it('should set loading status', () => {
    const baseCurrency = { code: 'NGN' };
    const selectedCurrencies = [
      { code: 'NGN' }, { code: 'EUR' }, { code: 'USD' },
    ];
    expect(doSetLoadingStatus(baseCurrency, selectedCurrencies).type)
      .toEqual(CURRENCY_LOADING_STATUS);
  });
});
