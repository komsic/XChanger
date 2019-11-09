import currencies from '../../assets/json/currency.json';
import { CURRENCY_LIST_REMOVE } from '../actionTypes';

const applyRemoveCurrency = (state, { name }) => {
  const [, ...names] = name.split(' ');
  return {
    ...state,
    selectedCurrencies: state.selectedCurrencies.filter(({ name: n }) => n !== names.join(' ')),
  };
};


export const INITIAL_STATE = {
  allCurrencies: currencies,
  selectedCurrencies: [],
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENCY_LIST_REMOVE: {
      return applyRemoveCurrency(state, action);
    }
    default: return state;
  }
};

export default currencyReducer;
