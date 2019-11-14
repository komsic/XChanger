import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/store';

const ProviderWrapper = ({ children, data }) => {
  return <Provider store={data}>{children}</Provider>;
};

const withProvider = (story) => {
  const s = story();
  if (!s.data) {
    return <ProviderWrapper data={store}>{s}</ProviderWrapper>;
  }

  return <ProviderWrapper data={s.data}>{s.story}</ProviderWrapper>;
};

export default withProvider;
