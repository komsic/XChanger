import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import '../../../public/normalize.css';
import DropdownInput from './DropdownInput';

const list = [
  { code: 'NGN', name: 'NGN' },
  { code: 'USD', name: 'USD' },
  { code: 'EUR', name: 'EUR' },
  { code: 'BAM', name: 'BAM' },
];

// eslint-disable-next-line react/prop-types
const StoryWithHook = ({ classes }) => {
  const [state, setState] = useState('');

  /* istanbul ignore next */
  const onChange = ({ target: { value } }) => setState(value);

  return (
    <DropdownInput
      value={state}
      onChange={onChange}
      name="random"
      placeholder="NGN"
      list={list}
      id="currecency"
      classes={classes || ''}
    />
  );
};

storiesOf('DropdownInput', module)
  .add('plain', () => <StoryWithHook />)
  .add('another flavour', () => <StoryWithHook classes="dropdown-input--r" />);
