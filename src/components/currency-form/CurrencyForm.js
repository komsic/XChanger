import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropdownInput from '../dropdown-input/DropdownInput';
import { getSelectedCurrenciesWithBaseCurrency } from '../../store/selectors/currency';

import './CurrencyForm.css';

const CurrencyForm = ({
  list, id, title, currencyName, handleCurrencyNameChange,
  handleCurrencyValueChange, disabled, name, currencyValue,
}) => (
  <div className="currency-form">
    <h5 className="currency-form__title">{title}</h5>

    <div className="currency-form__input">
      <input
        placeholder="0.00"
        disabled={disabled}
        name={name}
        onChange={({ target }) => handleCurrencyValueChange(target.value, name)}
        value={currencyValue}
      />

      <DropdownInput
        maxLength={3}
        placeholder="NGN"
        id={id}
        list={list}
        value={currencyName}
        name={name}
        onChange={
          ({ target }) => handleCurrencyNameChange(target.value.toUpperCase(), target.name)
        }
      />
    </div>
  </div>
);

CurrencyForm.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  currencyName: PropTypes.string.isRequired,
  currencyValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleCurrencyNameChange: PropTypes.func.isRequired,
  handleCurrencyValueChange: PropTypes.func.isRequired,
};

CurrencyForm.defaultProps = {
  disabled: false,
};

const mapStateToProps = (state) => ({
  list: getSelectedCurrenciesWithBaseCurrency(state),
});

export default connect(
  mapStateToProps,
)(CurrencyForm);
