import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import Button from './Button';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('text', () => <Button onClick={action('clicked')}>{object('btn text', 'Hello Button')}</Button>)
  .add('emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
