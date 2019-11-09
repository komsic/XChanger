import React from 'react';
import { Provider } from 'react-redux';
import { INITIAL_STATE as currencyState } from './store/reducers/currency';

const store = {
  getState: () => ({ currencyState }),
  subscribe: () => 0,
  dispatch: jest.fn(),
};

// eslint-disable-next-line react/prop-types
const ProviderTest = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default ProviderTest;