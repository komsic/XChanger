import { put, call } from 'redux-saga/effects';
import handleFetchRate from './currency';
import { doSetLoadingStatus } from '../actions/currency';
import fetchRates from '../api/currency';

describe('fetchRates', () => {
  it('should fetch the rate from the server', () => {
    const spy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ rates: { NGN: 1, USD: 2, CAD: 3 } }),
    }));

    const baseCurrency = { code: 'NGN' };
    const selectedCurrencies = [{ code: 'USD' }, { code: 'CAD' }];
    const gen = handleFetchRate({ baseCurrency, selectedCurrencies });

    expect(gen.next().value).toEqual(put(doSetLoadingStatus(baseCurrency, selectedCurrencies)));

    expect(gen.next().value).toEqual(call(fetchRates, {
      baseCurrency: baseCurrency.code,
      selectedCurrencies: selectedCurrencies.map(({ code }) => code),
    }));

    spy.mockReset();
    spy.mockRestore();

    gen.next();
  });

  it('should fetch the rate from the server', () => {
    const baseCurrency = { code: 'NGN' };
    const selectedCurrencies = [];
    const gen = handleFetchRate({ baseCurrency, selectedCurrencies });

    expect(gen.next().value).toEqual(put(doSetLoadingStatus(baseCurrency, selectedCurrencies)));

    expect(gen.next().value).toEqual(undefined);
  });
});
