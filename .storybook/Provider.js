import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/store';

const ProviderWrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

const withProvider = (story) => <ProviderWrapper store={store}>{story()}</ProviderWrapper>;

export default withProvider;
