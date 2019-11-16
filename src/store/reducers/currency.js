import currencies from '../../assets/json/currency.json';
import { CURRENCY_LIST_REMOVE, CURRENCY_BASE_ADD, CURRENCY_SELECTED_ADD } from '../actionTypes';

const applyRemoveCurrency = (state, { name }) => {
  const [, ...names] = name.split(' ');
  return {
    ...state,
    selectedCurrencies: state.selectedCurrencies.filter(({ name: n }) => n !== names.join(' ')),
  };
};

const applyAddBaseCurrency = (state, { currency }) => {
  const { selectedCurrencies } = state;

  return {
    ...state,
    baseCurrency: currency,
    selectedCurrencies: selectedCurrencies.filter(({ code }) => code !== currency.code),
  };
};

export const applyAddSelectedCurrency = (state, { currency }) => {
  const { selectedCurrencies } = state;

  return {
    ...state,
    selectedCurrencies: [...selectedCurrencies, currency],
  };
};

export const INITIAL_STATE = {
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
      symbol: 'KM',
      name: 'Bosnia-Herzegovina Convertible Mark',
      code: 'BAM',
    },
  ],
  rates: {
    NGN: 362.000063,
    USD: 1,
    CAD: 1.319045,
    EUR: 0.90287,
    AED: 3.673198,
    BAM: 1.773642,
  },
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENCY_LIST_REMOVE: return applyRemoveCurrency(state, action);
    case CURRENCY_BASE_ADD: return applyAddBaseCurrency(state, action);
    case CURRENCY_SELECTED_ADD: return applyAddSelectedCurrency(state, action);
    default: return state;
  }
};

export default currencyReducer;
