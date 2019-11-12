import {
  getAllCurrenciesNameAndCode, getSelectedCurrenciesWithBaseCurrency, isCurrencyValid, getRates,
} from './currency';
import { INITIAL_STATE } from '../reducers/currency';

describe('get all currencies names and codes', () => {
  it('should return array of currency names and codes', () => {
    const result = getAllCurrenciesNameAndCode({
      currencyState: {
        allCurrencies: {
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
        },
      },
    });

    expect(result).toEqual([
      { name: 'United States Dollar', code: 'USD' },
      { name: 'Canadian Dollar', code: 'CAD' },
      { name: 'Euro', code: 'EUR' },
    ]);
  });
});

describe('get selected currencies with base currency', () => {
  it('should return an array composing of selected currency and base currency', () => {
    const result = getSelectedCurrenciesWithBaseCurrency({
      currencyState: {
        baseCurrency: 'NGN',
        selectedCurrencies: ['USD', 'MSI', 'MSG'],
      },
    });

    expect(result).toEqual(['NGN', 'USD', 'MSI', 'MSG']);
  });
});

describe('check currency validity', () => {
  it('should ensure the given currency is among the selected currencies or base currency', () => {
    const isNull = isCurrencyValid({ currencyState: INITIAL_STATE });

    expect(isNull('NGN')).toBeTruthy();
  });
});

describe('currency rate', () => {
  const getRate = getRates({
    currencyState: {
      baseCurrency: {
        code: 'NGN',
      },
      rates: {
        NGN: 1,
        USD: 2,
      },
    },
  });

  it('should return zero if money is an empty string', () => {
    expect(getRate('NGN', 'USD', '')).toEqual(0);
  });

  it('should return 1.00 when the code argument value is NGN', () => {
    expect(getRate('NGN')).toEqual('1.00');
  });

  it('should return 3.00', () => {
    expect(getRate('NGN', 'USD', 6)).toEqual('3.00');
  });
});
