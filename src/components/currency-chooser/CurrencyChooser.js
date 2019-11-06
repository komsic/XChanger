import React, { useState } from 'react';
import DropdownInput from '../dropdown-input/DropdownInput';
import Button from '../button/Button';
import plusLogo from '../../assets/images/plus.svg';

import './CurrencyChooser.css';

const CurrencyChooser = ({ currencyName, list, id, }) => {
  const [currency, setCurrency] = useState(currencyName);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="currency-chooser" onSubmit={handleSubmit}>
      <DropdownInput
        placeholder="placeholder"
        list={list}
        id={id}
        value={currency}
        onChange={setCurrency}
      />

      <Button isImg classes="button--secondary">
        <img src={plusLogo} alt="button logo" />
      </Button>
    </form>
  );
};

export default CurrencyChooser;
