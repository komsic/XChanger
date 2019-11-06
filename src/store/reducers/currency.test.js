import deepFreeze from 'deep-freeze';
import currencyReducer, { INITIAL_STATE } from './currency';

describe('currency reducer', () => {
  it('should return state if it does not recognise the action type', () => {
    const allCurrencies = {
      USD: {
        symbol: '$',
        name: 'United States Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'USD',
        name_plural: 'United States Dollars',
      },
      CAD: {
        symbol: 'CA$',
        name: 'Canadian Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'CAD',
        name_plural: 'Canadian dollars',
      },
      EUR: {
        symbol: '€',
        name: 'Euro',
        symbol_native: '€',
        decimal_digits: 2,
        rounding: 0,
        code: 'EUR',
        name_plural: 'euros',
      },
    };

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
});
