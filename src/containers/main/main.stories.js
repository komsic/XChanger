import React from 'react';
import { storiesOf } from '@storybook/react';
import Main from './Main';
import store from '../../store';

storiesOf('Main', module)
  .add('default', () => <Main />)
  .add('empty state', () => ({
    story: <Main />,
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
