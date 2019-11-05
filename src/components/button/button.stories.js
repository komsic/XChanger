import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs, object, files, select,
} from '@storybook/addon-knobs/react';

import logo from '../../assets/images/cancel.svg';
import Button from './Button';

const options = {
  primary: 'button--primary',
  secondary: 'button--secondary',
  danger: 'button--danger',
};

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('text', () => <Button classes={select('classes', options, 'button--primary')} onClick={action('clicked')}>{object('btn text', 'Manage Currencies')}</Button>)
  .add('image', () => (
    <Button isImg onClick={action('clicked')} classes={select('classes', options, 'button--primary')}>
      <img src={files('buttonImage', '.svg', logo)} alt="button logo" />
    </Button>
  ))
  .add('image-circle', () => (
    <Button isImg onClick={action('clicked')} classes={`button-image--circle ${select('classes', options, 'button--primary')}`}>
      <img src={files('buttonImage', '.svg', logo)} alt="button logo" />
    </Button>
  ));
