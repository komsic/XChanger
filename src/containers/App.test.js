import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from './App';
import ProviderTest, { store } from '../ProviderTest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <ProviderTest>
      <App />
    </ProviderTest>), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should renders without crashing when the error in currencyState is set to a truthy value', () => {
  const data = {
    ...store,
    getState: () => ({
      ...store.getState(),
      currencyState: {
        ...store.getState().currencyState,
        error: 'i am error',
      },
    }),
  };

  const div = document.createElement('div');
  ReactDOM.render((
    <ProviderTest data={data}>
      <App />
    </ProviderTest>), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should ensure that dispatch is called when both cancel and retry button in error are click', () => {
  const component = mount(
    <ProviderTest>
      <App
        name="(NGN) Nigerian Naira"
      />
    </ProviderTest>,
  );

  const btns = component.find('.error').find('button');
  btns.at(0).simulate('click');
  btns.at(1).simulate('click');

  expect(store.dispatch).toHaveBeenCalled();
});
