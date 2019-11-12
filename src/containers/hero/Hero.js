import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Hero.css';
import CurrencyForm from '../../components/currency-form/CurrencyForm';
import {
  getSelectedCurrenciesWithBaseCurrency, isCurrencyValid, getRates,
} from '../../store/selectors/currency';

export const CURRENCY_VALUE_CHANGE = 'CURRENCY_VALUE_CHANGE';
export const CURRENCY_NAME_CHANGE = 'CURRENCY_NAME_CHANGE';

const applyCurrencyNameChange = (state, { value, name, isNull }) => {
  let { currencies } = state;
  currencies = { ...currencies, [name]: value };
  const { currencyOne, currencyTwo } = currencies;

  /**
   * If both currencies length are 3
   * and the first currencies is not equal to the second currency
   * and both currencies are in the selectedCurrencies list or baseCurrency,
   * then dispatch input disabled as false
  */
  let disabled = true;
  if ((currencyOne.length === 3 && currencyTwo.length === 3)
    && (currencyOne !== currencyTwo)
    && (isNull(currencyOne) && isNull(currencyTwo))) {
    disabled = false;
  }

  return {
    ...state,
    disabled,
    currencies,
    money: 0,
  };
};

const applyCurrencyValueChange = (state, { value, name }) => ({
  ...state,
  currentCurrency: name,
  money: value.replace(/[^0-9.]/, ''),
});

export const heroReducer = (state, action) => {
  switch (action.type) {
    case CURRENCY_NAME_CHANGE: return applyCurrencyNameChange(state, action);
    case CURRENCY_VALUE_CHANGE: return applyCurrencyValueChange(state, action);
    default: return state;
  }
};

export const INITIAL_STATE = (currencyOne, currencyTwo) => ({
  currencies: {
    currencyOne,
    currencyTwo,
  },
  currentCurrency: currencyOne,
  money: 0,
  disabled: false,
});

export const getCurrency = (currentCurrency, current, money, otherMoney) => (
  currentCurrency === current ? money : otherMoney);

const Hero = ({ list, isNull, getRate }) => {
  const [{
    currencies: { currencyOne, currencyTwo }, disabled, money, currentCurrency,
  }, dispatch] = useReducer(heroReducer, INITIAL_STATE(list[0].code, list[1].code));


  const handleCurrencyChange = (value, name, status) => dispatch({
    isNull,
    value,
    name,
    type: status ? CURRENCY_VALUE_CHANGE : CURRENCY_NAME_CHANGE,
  });

  const c1 = getCurrency(currentCurrency, 'currencyOne', money, getRate(currencyOne, currencyTwo, money));
  const c2 = getCurrency(currentCurrency, 'currencyTwo', money, getRate(currencyTwo, currencyOne, money));

  return (
    <div className="hero-container">
      <div className="hero">
        <h3 className="medium">Check Currency Rate</h3>

        <div className="hero__body">
          <CurrencyForm
            id="selected-currencies"
            title="Send Currency"
            name="currencyOne"
            currencyName={currencyOne}
            currencyValue={c1.toString()}
            disabled={disabled}
            handleCurrencyNameChange={handleCurrencyChange}
            handleCurrencyValueChange={handleCurrencyChange}
          />

          <CurrencyForm
            id="selected-currencies"
            title="Receive Currency"
            name="currencyTwo"
            currencyName={currencyTwo}
            currencyValue={c2.toString()}
            disabled={disabled}
            handleCurrencyNameChange={handleCurrencyChange}
            handleCurrencyValueChange={handleCurrencyChange}
          />
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  isNull: PropTypes.func.isRequired,
  getRate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list: getSelectedCurrenciesWithBaseCurrency(state),
  isNull: isCurrencyValid(state),
  getRate: getRates(state),
});

export default connect(
  mapStateToProps,
)(Hero);
