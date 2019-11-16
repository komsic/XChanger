import React from 'react';
import { storiesOf } from '@storybook/react';
import ManageCurrencies from './ManageCurrencies';

storiesOf('ManageCurrencies', module)
  .add('default', () => <ManageCurrencies />);
