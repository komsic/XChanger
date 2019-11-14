import { CURRENCY_LIST_REMOVE, CURRENCY_BASE_ADD } from '../actionTypes';

export const doRemoveCurrency = (name) => ({
  name,
  type: CURRENCY_LIST_REMOVE,
});

export const doAddBaseCurrency = (currency) => ({
  currency,
  type: CURRENCY_BASE_ADD,
});
