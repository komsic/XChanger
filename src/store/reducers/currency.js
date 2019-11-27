import currencies from '../../assets/json/currency.json';
import {
  CURRENCY_LIST_REMOVE, CURRENCY_RATE_ADD, CURRENCY_LOADING_STATUS, CURRENCY_RATE_FETCH_ERROR,
  CURRENCY_ERROR_CANCEL,
} from '../actionTypes';

const applyRemoveCurrency = (state, { name }) => {
  const [, ...names] = name.split(' ');
  return {
    ...state,
    selectedCurrencies: state.selectedCurrencies.filter(({ name: n }) => n !== names.join(' ')),
  };
};

const applyAddRates = (state, { rates }) => {
  const result = {
    ...state,
    loading: false,
    error: null,
    past: {},
    future: {},
  };

  if (rates) {
    result.rates = rates;
  }

  return result;
};

const applyRateFetchError = (state, { error }) => {
  const {
    baseCurrency, selectedCurrencies, past: { baseCurrency: bc, selectedCurrencies: sc },
  } = state;

  return {
    ...state,
    error,
    baseCurrency: bc,
    selectedCurrencies: sc,
    loading: false,
    future: { baseCurrency, selectedCurrencies },
  };
};

const applyLoadingStatus = (state, { baseCurrency, selectedCurrencies }) => {
  const { baseCurrency: bc, selectedCurrencies: sc } = state;
  return {
    ...state,
    baseCurrency,
    selectedCurrencies,
    past: { baseCurrency: bc, selectedCurrencies: sc },
    loading: true,
  };
};

const applyCancelError = (state) => ({
  ...state,
  error: null,
});

export const INITIAL_STATE = {
  past: {
    baseCurrency: {},
    selectedCurrency: [],
  },
  future: {
    baseCurrency: {},
    selectedCurrency: [],
  },
  baseCurrency: {
    symbol: '₦',
    code: 'NGN',
    name: 'Nigerian Naira',
  },
  allCurrencies: currencies,
  selectedCurrencies: [
    {
      symbol: '$',
      name: 'United States Dollar',
      code: 'USD',
    },
    {
      symbol: 'CA$',
      name: 'Canadian Dollar',
      code: 'CAD',
    },
    {
      symbol: '€',
      name: 'Euro',
      code: 'EUR',
    },
    {
      symbol: 'AED',
      name: 'United Arab Emirates Dirham',
      code: 'AED',
    },
    {
      symbol: 'R$',
      name: 'Brazilian Real',
      code: 'BRL',
    },
  ],
  rates: {
    NGN: 362.000063,
    USD: 1,
    CAD: 1.319045,
    EUR: 0.90287,
    AED: 3.673198,
    BRL: 1.773642,
  },
  loading: false,
  error: null,
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENCY_LIST_REMOVE: return applyRemoveCurrency(state, action);
    case CURRENCY_RATE_ADD: return applyAddRates(state, action);
    case CURRENCY_RATE_FETCH_ERROR: return applyRateFetchError(state, action);
    case CURRENCY_LOADING_STATUS: return applyLoadingStatus(state, action);
    case CURRENCY_ERROR_CANCEL: return applyCancelError(state, action);
    default: return state;
  }
};

export default currencyReducer;
