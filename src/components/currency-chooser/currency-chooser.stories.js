import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CurrencyChooser from './CurrencyChooser';

storiesOf('CurrencyChooser', module)
  .add('default', () => (
    <CurrencyChooser
      currencyName="United State Dollar"
      id="currencies"
      onCurrencySelect={action('currency selected')}
      placeholder="Add A Currency"
    />
  ))
  .add('clear after button click', () => (
    <CurrencyChooser
      currencyName="United State Dollar"
      id="currencies"
      onCurrencySelect={action('currency selected')}
      placeholder="Add A Currency"
      clear
    />
  ));
