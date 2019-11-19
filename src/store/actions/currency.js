import {
  CURRENCY_LIST_REMOVE, CURRENCY_RATE_FETCH, CURRENCY_RATE_ADD, CURRENCY_LOADING_STATUS,
  CURRENCY_RATE_FETCH_ERROR,
  CURRENCY_ERROR_CANCEL,
} from '../actionTypes';

export const doRemoveCurrency = (name) => ({
  name,
  type: CURRENCY_LIST_REMOVE,
});

export const doFetchRate = (baseCurrency, selectedCurrencies) => ({
  baseCurrency,
  selectedCurrencies,
  type: CURRENCY_RATE_FETCH,
});

export const doAddRates = (rates) => ({
  rates,
  type: CURRENCY_RATE_ADD,
});

export const doSetLoadingStatus = (baseCurrency, selectedCurrencies) => ({
  baseCurrency,
  selectedCurrencies: selectedCurrencies.filter(({ code }) => code !== baseCurrency.code),
  type: CURRENCY_LOADING_STATUS,
});

export const doFetchError = (error) => ({
  error,
  type: CURRENCY_RATE_FETCH_ERROR,
});

export const doCancelError = () => ({
  type: CURRENCY_ERROR_CANCEL,
});
