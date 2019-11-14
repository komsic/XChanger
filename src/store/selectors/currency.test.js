import {
  getAllCurrenciesNameAndCode, getSelectedCurrenciesWithBaseCurrency, isCurrencyValid, getRates, getBaseCurrency,
} from './currency';
import { INITIAL_STATE } from '../reducers/currency';

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

describe('get all currencies names and codes', () => {
  it('should return array of currency names and codes', () => {
    const result = getAllCurrenciesNameAndCode({
      currencyState: {
        allCurrencies: currencies,
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

describe('getBaseCurrency', () => {
  const getCurrency = getBaseCurrency({
    currencyState: { allCurrencies: currencies },
  });

  it('should return base currency if the input arg is a 3 letters word', () => {
    expect(getCurrency('USD')).toEqual(currencies.USD);
  });

  it('should return base currency if the input arg is > a 3 letters word', () => {
    expect(getCurrency('United States Dollar')).toEqual(currencies.USD);
  });
});
