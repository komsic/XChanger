import { CURRENCY_LIST_REMOVE } from '../actionTypes';

export const doRemoveCurrency = (name) => ({
  name,
  type: CURRENCY_LIST_REMOVE,
});
