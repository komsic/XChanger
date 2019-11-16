import { CURRENCY_LIST_REMOVE, CURRENCY_BASE_ADD, CURRENCY_SELECTED_ADD } from '../actionTypes';

export const doRemoveCurrency = (name) => ({
  name,
  type: CURRENCY_LIST_REMOVE,
});

export const doAddBaseCurrency = (currency) => ({
  currency,
  type: CURRENCY_BASE_ADD,
});

export const doAddSelectedCurrency = (currency) => ({
  currency,
  type: CURRENCY_SELECTED_ADD,
});
