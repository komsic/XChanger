import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProviderTest from '../ProviderTest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <ProviderTest>
      <App />
    </ProviderTest>), div);
  ReactDOM.unmountComponentAtNode(div);
});
