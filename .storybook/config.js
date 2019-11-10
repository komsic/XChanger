import { configure, addDecorator } from '@storybook/react';
import requireContext from 'require-context.macro';

import '../public/normalize.css';
import '../src/index.css';
import '../src/containers/App.css';
import withProvider from './Provider';

addDecorator(withProvider);

const req = requireContext('../src', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
