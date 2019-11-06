import currencies from '../../assets/json/currency.json';

export const INITIAL_STATE = {
  allCurrencies: currencies,
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default: return state;
  }
};

export default currencyReducer;
