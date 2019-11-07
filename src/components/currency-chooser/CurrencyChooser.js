import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropdownInput from '../dropdown-input/DropdownInput';
import Button from '../button/Button';
import plusLogo from '../../assets/images/plus.svg';

import './CurrencyChooser.css';
import getAllCurrenciesNameAndCode from '../../store/selectors/currency';


const CurrencyChooser = ({
  currencyName, list, id, onCurrencySelect, placeholder, clear,
}) => {
  const [currency, setCurrency] = useState(currencyName);

  const handleSubmit = (event) => {
    event.preventDefault();
    onCurrencySelect(currency);
    if (clear) {
      setCurrency('');
    }
  };

  const handleCurrencyChange = ({ target: { value } }) => setCurrency(value);

  return (
    <form className="currency-chooser" onSubmit={handleSubmit}>
      <DropdownInput
        placeholder={placeholder}
        list={list}
        id={id}
        value={currency}
        onChange={handleCurrencyChange}
      />

      <Button isImg classes="button--secondary" type="submit">
        <img src={plusLogo} alt="button logo" />
      </Button>
    </form>
  );
};

CurrencyChooser.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  currencyName: PropTypes.string,
  clear: PropTypes.bool,
  onCurrencySelect: PropTypes.func.isRequired,
};

CurrencyChooser.defaultProps = {
  placeholder: '',
  currencyName: '',
  clear: false,
};

const mapStateToProps = (state) => ({
  list: getAllCurrenciesNameAndCode(state),
});

export default connect(
  mapStateToProps,
)(CurrencyChooser);
