import React from 'react';
import { storiesOf } from '@storybook/react';
import Hero from './Hero';
import store from '../../store';

storiesOf('Hero', module)
  .add('default', () => <Hero />)
  .add('empty', () => ({
    story: <Hero />,
    data: {
      ...store,
      getState: () => ({
        ...store.getState(),
        currencyState: {
          ...store.getState().currencyState,
          selectedCurrencies: [],
        },
      }),
    },
  }));
