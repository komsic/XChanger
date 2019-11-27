import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Hero.css';
import CurrencyForm from '../../components/currency-form/CurrencyForm';
import {
  getSelectedCurrenciesWithBaseCurrency, isCurrencyValid, getRates, getLoadingStatus,
} from '../../store/selectors/currency';

export const CURRENCY_VALUE_CHANGE = 'CURRENCY_VALUE_CHANGE';
export const CURRENCY_NAME_CHANGE = 'CURRENCY_NAME_CHANGE';
export const CURRENCIES = 'CURRENCIES';

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

const applyCurrenciesChange = (state, { currencyOne, currencyTwo }) => ({
  ...state,
  currencies: {
    currencyOne,
    currencyTwo,
  },
});

export const heroReducer = (state, action) => {
  switch (action.type) {
    case CURRENCY_NAME_CHANGE: return applyCurrencyNameChange(state, action);
    case CURRENCY_VALUE_CHANGE: return applyCurrencyValueChange(state, action);
    case CURRENCIES: return applyCurrenciesChange(state, action);
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

const Hero = ({
  list, isNull, getRate, loading,
}) => {
  let cur1 = '';
  let cur2 = '';
  if (list.length >= 2) {
    cur1 = list[0].code;
    cur2 = list[1].code;
  }
  const [{
    currencies: { currencyOne, currencyTwo }, disabled, money, currentCurrency,
  }, dispatch] = useReducer(heroReducer, INITIAL_STATE(cur1, cur2));

  const handleCurrencyChange = (value, name, status) => dispatch({
    isNull,
    value,
    name,
    type: status ? CURRENCY_VALUE_CHANGE : CURRENCY_NAME_CHANGE,
  });

  const c1 = getCurrency(currentCurrency, 'currencyOne', money, getRate(currencyOne, currencyTwo, money));
  const c2 = getCurrency(currentCurrency, 'currencyTwo', money, getRate(currencyTwo, currencyOne, money));

  const disabledStatus = loading || disabled;

  useEffect(() => {
    dispatch({
      currencyTwo: cur2,
      currencyOne: cur1,
      type: CURRENCIES,
    });
  }, [cur1, cur2]);

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
            disabled={disabledStatus}
            handleCurrencyNameChange={handleCurrencyChange}
            handleCurrencyValueChange={handleCurrencyChange}
          />

          <CurrencyForm
            id="selected-currencies"
            title="Receive Currency"
            name="currencyTwo"
            currencyName={currencyTwo}
            currencyValue={c2.toString()}
            disabled={disabledStatus}
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
  loading: PropTypes.bool.isRequired,
  isNull: PropTypes.func.isRequired,
  getRate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list: getSelectedCurrenciesWithBaseCurrency(state),
  isNull: isCurrencyValid(state),
  getRate: getRates(state),
  loading: getLoadingStatus(state),
});

export default connect(
  mapStateToProps,
)(Hero);
