import fetchRates from './currency';

describe('fetchRates', () => {
  it('should fetch the rate from the server', (done) => {
    const spy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }));

    fetchRates({ baseCurrency: 'NGN', selectedCurrencies: ['USD', 'ABU'] })
      .then(() => {
        expect(spy).toHaveBeenCalled();

        spy.mockReset();
        spy.mockRestore();

        done();
      });
  });

  it('should throw the rate from the server', async (done) => {
    const spy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        status: 'error',
        error: 'Internal server error',
      }),
    }));
    try {
      await fetchRates({ baseCurrency: 'NGN', selectedCurrencies: ['USD', 'ABU'] });
    } catch (error) {
      expect(error.message).toBe('Internal server error');

      spy.mockReset();
      spy.mockRestore();

      done();
    }
  });
});
