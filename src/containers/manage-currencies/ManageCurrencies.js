/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { doToggleModal } from '../../store/actions/ui';
import Button from '../../components/button/Button';
import cancelLogo from '../../assets/images/cancel.svg';
import CurrencyLabel from '../../components/currency-label/CurrencyLabel';
import CurrencyChooser from '../../components/currency-chooser/CurrencyChooser';
import { doAddBaseCurrency, doAddSelectedCurrency } from '../../store/actions/currency';
import {
  getBaseCurrencyName, getSelectedCurrencies, getFilteredCurrencyList, getAllCurrenciesNameAndCode,
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
  onNewCurrencyAdded,
  setBaseCurrency,
  baseCurrencyName,
  selectedCurrencies,
  list,
  filteredList,
}) => (
  <div>
    <Head onModalCanceled={onModalToggled} />

    <Body
      onNewCurrencyAdded={onNewCurrencyAdded}
      setBaseCurrency={setBaseCurrency}
      baseCurrencyName={baseCurrencyName}
      selectedCurrencies={selectedCurrencies}
      list={list}
      filteredList={filteredList}
    />
  </div>
);

ManageCurrency.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredList: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseCurrencyName: PropTypes.string.isRequired,
  selectedCurrencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onModalToggled: PropTypes.func.isRequired,
  onNewCurrencyAdded: PropTypes.func.isRequired,
  setBaseCurrency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  baseCurrencyName: getBaseCurrencyName(state),
  selectedCurrencies: getSelectedCurrencies(state),
  filteredList: getFilteredCurrencyList(state),
  list: getAllCurrenciesNameAndCode(state),
});

const mapDispatchToProps = (dispatch) => ({
  onModalToggled: () => dispatch(doToggleModal),
  setBaseCurrency: (currency) => dispatch(doAddBaseCurrency(currency)),
  onNewCurrencyAdded: (currency) => dispatch(doAddSelectedCurrency(currency)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCurrency);
