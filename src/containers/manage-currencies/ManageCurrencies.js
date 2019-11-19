/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { doToggleModal } from '../../store/actions/ui';
import Button from '../../components/button/Button';
import cancelLogo from '../../assets/images/cancel.svg';
import CurrencyLabel from '../../components/currency-label/CurrencyLabel';
import CurrencyChooser from '../../components/currency-chooser/CurrencyChooser';
import { doFetchRate } from '../../store/actions/currency';
import {
  getBaseCurrencyNameCode, getSelectedCurrencies, getFilteredCurrencyList,
  getAllCurrenciesNameAndCode,
} from '../../store/selectors/currency';

import './ManageCurrencies.css';

const Head = ({ onModalCanceled }) => (
  <div className="modal__head">
    <h3 className="big">Manage Currencies</h3>

    <Button
      onClick={() => onModalCanceled()}
      classes="button-image--circle button--danger"
      isImg
    >
      <img src={cancelLogo} alt="cancel logo" />
    </Button>
  </div>
);

const Body = ({
  onNewCurrencyAdded, setBaseCurrency, baseCurrencyName, selectedCurrencies, list, filteredList,
}) => (
  <div className="modal__body">
    <div className="one-container">
      <h5 className="medium">Set Base Currency</h5>

      <CurrencyChooser
        list={list}
        id="all-currencies"
        placeholder="Nigerian Naira"
        currencyName={baseCurrencyName}
        onCurrencySelected={setBaseCurrency}
      />
    </div>

    <ul>
      {selectedCurrencies.map(({ name, code }) => (
        <CurrencyLabel
          key={code}
          name={`(${code}) ${name}`}
        />
      ))}
    </ul>

    <CurrencyChooser
      list={filteredList}
      id="filtered-currencies"
      placeholder="Add A New Currency"
      clear
      onCurrencySelected={onNewCurrencyAdded}
    />
  </div>
);

const ManageCurrency = ({
  onModalToggled,
  baseCurrency,
  selectedCurrencies,
  list,
  filteredList,
  fetchRates,
}) => {
  const [currencies, setCurrencies] = useState(selectedCurrencies);
  const [currency, setCurrency] = useState(baseCurrency);

  const onModalCancel = () => {
    onModalToggled();
    fetchRates(currency, currencies);
  };

  const onNewCurrencyAdded = (c) => {
    setCurrencies([...currencies, c]);
  };

  const setBaseCurrency = (c) => {
    setCurrency(c);
  };

  useEffect(() => {
    setCurrencies(selectedCurrencies);
    setCurrency(baseCurrency);
  }, [selectedCurrencies, baseCurrency]);

  return (
    <div>
      <Head onModalCanceled={onModalCancel} />

      <Body
        onNewCurrencyAdded={onNewCurrencyAdded}
        setBaseCurrency={setBaseCurrency}
        baseCurrencyName={currency.name}
        selectedCurrencies={currencies}
        list={list}
        filteredList={filteredList}
      />
    </div>
  );
};

ManageCurrency.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredList: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseCurrency: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  selectedCurrencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onModalToggled: PropTypes.func.isRequired,
  fetchRates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  baseCurrency: getBaseCurrencyNameCode(state),
  selectedCurrencies: getSelectedCurrencies(state),
  filteredList: getFilteredCurrencyList(state),
  list: getAllCurrenciesNameAndCode(state),
});

const mapDispatchToProps = (dispatch) => ({
  onModalToggled: () => dispatch(doToggleModal),
  fetchRates: (baseCurrency, selectedCurrencies) => dispatch(
    doFetchRate(baseCurrency, selectedCurrencies),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCurrency);
