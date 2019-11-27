import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropdownInput from '../../components/dropdown-input/DropdownInput';
import Card from '../../components/card/Card';
import {
  getAllCurrenciesNameAndCode, getSelectedCurrencies, getBaseCurrencyCode, getCurrency,
} from '../../store/selectors/currency';
import { doFetchRate } from '../../store/actions/currency';

import './Main.css';

const Main = ({
  allCurrencies, selectedCurrencies, baseCurrencyCode,
  getCurrencyObject, fetchRates,
}) => {
  const [currency, setCurrency] = useState(baseCurrencyCode);
  const [error, setError] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setCurrency(value.toUpperCase());
    if (value.length === 3) {
      const baseCurrency = getCurrencyObject(value.toUpperCase());
      if (baseCurrency) {
        return fetchRates(baseCurrency, selectedCurrencies);
      }

      return setError(true);
    }

    return setError(false);
  };

  useEffect(() => {
    setCurrency(baseCurrencyCode);
  }, [baseCurrencyCode]);

  const list = selectedCurrencies.length > 0 ? (
    <ul className="main__body">
      {selectedCurrencies.map((card) => (
        <Card
          key={card.code}
          card={card}
        />
      ))}
    </ul>
  ) : (
    <div className="empty-state">
      <p>You haven&apos;t selected any currency.  Please click</p>
      <p className="emp">Manage Currencies</p>
      <p>button at the top to add the currencies.</p>
    </div>
  );

  return (
    <main className="main">
      <div className="main__header">
        <h2 className="medium">Exchange Rates</h2>

        <span>
          <label>Base Currency</label>

          <DropdownInput
            list={allCurrencies}
            id="base-currency"
            maxLength={3}
            value={currency}
            placeholder="NGN"
            status={error}
            showValueAsCode
            classes="dropdown-input--r"
            onChange={handleChange}
          />
        </span>
      </div>

      {list}
    </main>
  );
};

Main.propTypes = {
  allCurrencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCurrencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseCurrencyCode: PropTypes.string.isRequired,
  getCurrencyObject: PropTypes.func.isRequired,
  fetchRates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allCurrencies: getAllCurrenciesNameAndCode(state),
  selectedCurrencies: getSelectedCurrencies(state),
  baseCurrencyCode: getBaseCurrencyCode(state),
  getCurrencyObject: getCurrency(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRates: (baseCurrency, selectedCurrencies) => dispatch(
    doFetchRate(baseCurrency, selectedCurrencies),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
