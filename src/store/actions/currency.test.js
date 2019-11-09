import { doRemoveCurrency } from './currency';
import { CURRENCY_LIST_REMOVE } from '../actionTypes';

describe('currency action creators tests', () => {
  it('should return currency remove action given the currency name', () => {
    expect(doRemoveCurrency('name')).toEqual({
      name: 'name',
      type: CURRENCY_LIST_REMOVE,
    });
  });
});
