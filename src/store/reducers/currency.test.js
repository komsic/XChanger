import deepFreeze from 'deep-freeze';
import currencyReducer, { INITIAL_STATE } from './currency';
import { CURRENCY_LIST_REMOVE, CURRENCY_BASE_ADD, CURRENCY_SELECTED_ADD } from '../actionTypes';

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

  it('should add base currencies when the action type is CURRENCY_BASE_ADD', () => {
    const newState = currencyReducer({
      allCurrencies: ['a', 'b', 'c'],
      selectedCurrencies: [...Object.values(currencies)],
    }, { type: CURRENCY_BASE_ADD, currency: currencies.CAD });

    expect(newState.baseCurrency).toEqual(currencies.CAD);
  });

  it('should add currency to the selected currencies when the action type is CURRENCY_SELECTED_ADD', () => {
    const newState = currencyReducer({
      selectedCurrencies: [...Object.values(currencies)],
    }, {
      type: CURRENCY_SELECTED_ADD,
      currency: {
        symbol: '€',
        name: 'Basidr',
        code: 'NON',
      },
    });

    expect(newState.selectedCurrencies.length).toEqual(4);
  });
});
