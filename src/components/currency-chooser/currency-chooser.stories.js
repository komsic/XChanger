import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CurrencyChooser from './CurrencyChooser';

const list = [
  {
    symbol: '$',
    name: 'United States Dollar',
    code: 'USD',
  },
  {
    symbol: 'CA$',
    name: 'Canadian Dollar',
    code: 'CAD',
  },
  {
    symbol: '€',
    name: 'Euro',
    code: 'EUR',
  },
  {
    symbol: 'AED',
    name: 'United Arab Emirates Dirham',
    code: 'AED',
  },
  {
    symbol: 'KM',
    name: 'Bosnia-Herzegovina Convertible Mark',
    code: 'BAM',
  },
];

storiesOf('CurrencyChooser', module)
  .add('default', () => (
    <CurrencyChooser
      list={list}
      currencyName="United States Dollar"
      id="currencies"
      onCurrencySelected={action('currency selected')}
      placeholder="Add A Currency"
    />
  ))
  .add('clear after button click', () => (
    <CurrencyChooser
      list={list}
      currencyName="United States Dollar"
      id="currencies"
      onCurrencySelected={action('currency selected')}
      placeholder="Add A Currency"
      clear
    />
  ));
