import { getAllCurrenciesNameAndCode, getSelectedCurrenciesWithBaseCurrency } from './currency';

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
