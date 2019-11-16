import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropdownInput from '../dropdown-input/DropdownInput';
import Button from '../button/Button';
import plusLogo from '../../assets/images/plus.svg';

import './CurrencyChooser.css';
import { getCurrency } from '../../store/selectors/currency';

const CurrencyChooser = ({
  currencyName, list, id, onCurrencySelected, placeholder, clear, getCurrencyObject,
}) => {
  const [currency, setCurrency] = useState(currencyName);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currencyObject = getCurrencyObject(currency);
    if (currencyObject) {
      onCurrencySelected(currencyObject);

      if (clear) {
        setCurrency('');
      }
    } else {
      setError(true);
    }
  };

  const handleCurrencyChange = ({ target: { value } }) => {
    setError(false);
    setCurrency(value);
  };

  return (
    <form className="currency-chooser" onSubmit={handleSubmit}>
      <DropdownInput
        placeholder={placeholder}
        list={list}
        id={id}
        value={currency}
        status={error}
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
  onCurrencySelected: PropTypes.func.isRequired,
  getCurrencyObject: PropTypes.func.isRequired,
};

CurrencyChooser.defaultProps = {
  placeholder: '',
  currencyName: '',
  clear: false,
};

const mapStateToProps = (state) => ({
  getCurrencyObject: getCurrency(state),
});

export default connect(mapStateToProps)(CurrencyChooser);
