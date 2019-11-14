import { doRemoveCurrency, doAddBaseCurrency } from './currency';
import { CURRENCY_LIST_REMOVE, CURRENCY_BASE_ADD } from '../actionTypes';

describe('currency action creators tests', () => {
  it('should return currency remove action given the currency name', () => {
    expect(doRemoveCurrency('name')).toEqual({
      name: 'name',
      type: CURRENCY_LIST_REMOVE,
    });
  });

  it('should return base currency action action given the currency', () => {
    expect(doAddBaseCurrency('currency')).toEqual({
      currency: 'currency',
      type: CURRENCY_BASE_ADD,
    });
  });
});
