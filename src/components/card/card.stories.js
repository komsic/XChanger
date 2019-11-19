import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import Card from './Card';
import store from '../../store';

const card = {
  symbol: 'KM',
  name: 'Bosnia-Herzegovina Convertible Mark',
  code: 'BAM',
};

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .add('long', () => <Card card={object('card', card)} />)
  .add('loading', () => ({
    story: <Card card={card} />,
    data: {
      ...store,
      getState: () => ({
        ...store.getState(),
        currencyState: {
          ...store.getState().currencyState,
          loading: true,
        },
      }),
    },
  }));
