import deepFreeze from 'deep-freeze';
import currencyReducer, { INITIAL_STATE } from './currency';
import {
  CURRENCY_LIST_REMOVE, CURRENCY_RATE_ADD, CURRENCY_RATE_FETCH_ERROR,
  CURRENCY_LOADING_STATUS, CURRENCY_ERROR_CANCEL,
} from '../actionTypes';

describe('currency reducer', () => {
  const currencies = {
    USD: {
      symbol: '$',
      name: 'United States Dollar',
      code: 'USD',
    },
    CAD: {
      symbol: 'CA$',
      name: 'Canadian Dollar',
      code: 'CAD',
    },
    EUR: {
      symbol: '€',
      name: 'Euro',
      code: 'EUR',
    },
  };

  it('should return state if it does not recognise the action type', () => {
    const allCurrencies = currencies;

    const previousState = { allCurrencies };
    const expectedNewState = { allCurrencies };

    deepFreeze(previousState);
    const newState = currencyReducer(previousState, {});

    expect(newState).toEqual(expectedNewState);
  });

  it('should use initial state when an undefined state is provided by ', () => {
    const newState = currencyReducer(undefined, {});

    expect(newState).toEqual(INITIAL_STATE);
  });

  it('should filter selected currencies when the action type is CURRENCY_LIST_REMOVE', () => {
    const newState = currencyReducer({
      allCurrencies: ['a', 'b', 'c'],
      selectedCurrencies: [...Object.values(currencies)],
    }, { type: CURRENCY_LIST_REMOVE, name: '(EUR) Euro' });

    expect(newState.selectedCurrencies.length).toEqual(2);
  });

  const rates = {
    USD: 1,
    CAD: 2,
    EUR: 3,
  };

  it('should not change the rates when action type is CURRENCY_RATE_ADD but rates is undefined', () => {
    const newState = currencyReducer({ rates }, { type: CURRENCY_RATE_ADD });

    expect(newState.rates).toEqual(rates);
  });

  it('should add rates when the action type is CURRENCY_RATE_ADD and rates is supplied', () => {
    const newRates = {
      USD: 6,
      CAD: 5,
      EUR: 4,
    };

    const newState = currencyReducer({ rates }, { type: CURRENCY_RATE_ADD, rates: newRates });

    expect(newState.rates).toEqual(newRates);
  });

  it('should change error to the error message when action type is CURRENCY_RATE_FETCH_ERROR', () => {
    const error = 'i am inevitable';
    const newState = currencyReducer({
      selectedCurrencies: [...Object.values(currencies)],
      baseCurrency: currencies.USD,
      past: {
        selectedCurrencies: [...Object.values(currencies)],
        baseCurrency: currencies.USD,
      },
    }, { error, type: CURRENCY_RATE_FETCH_ERROR });

    expect(newState.error).toEqual(error);
  });

  it('should turn loading state to true', () => {
    const newState = currencyReducer({
      selectedCurrencies: [...Object.values(currencies)],
      baseCurrency: currencies.USD,
    }, { type: CURRENCY_LOADING_STATUS });

    expect(newState.loading).toEqual(true);
  });

  it('should change the error state to null', () => {
    const newState = currencyReducer({}, { type: CURRENCY_ERROR_CANCEL });

    expect(newState.error).toEqual(null);
  });
});
