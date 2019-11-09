import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import CurrencyLabel from './CurrencyLabel';

storiesOf('CurrencyLabel', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <CurrencyLabel name={object('label', '(NGN) Nigerian Naira')} />
  ));
