import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import Card from './Card';

const card = {
  symbol: 'KM',
  name: 'Bosnia-Herzegovina Convertible Mark',
  code: 'BAM',
};

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .add('long', () => <Card card={object('card', card)} />);
