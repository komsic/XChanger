import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CurrencyForm from './CurrencyForm';

// eslint-disable-next-line react/prop-types
const StoryWithHook = () => {
  const [name, setName] = useState('USD');
  const [value, setValue] = useState(0);

  /* istanbul ignore next */
  const onValueChange = (v, n) => {
    setValue(v);
    action(n);
  };
  /* istanbul ignore next */
  const onNameChange = (v, n) => {
    setName(v);
    action(n);
  };

  return (
    <CurrencyForm
      id="selectedCurrencies"
      title="Send Currency"
      name="currency-one"
      currencyName={name}
      currencyValue={value.toString()}
      handleCurrencyNameChange={onNameChange}
      handleCurrencyValueChange={onValueChange}
    />
  );
};

storiesOf('CurrencyForm', module)
  .add('default', () => <StoryWithHook />);
