import React from 'react';
import { mount } from 'enzyme';
import ManageCurrencies from './ManageCurrencies';
import ProviderTest, { store } from '../../ProviderTest';

it('should test if the the prop functions were called', () => {
  const component = mount(
    <ProviderTest>
      <ManageCurrencies />
    </ProviderTest>,
  );

  component.find('button').at(0).simulate('click');
  component.find('form').at(0).simulate('submit');

  const event = {
    target: { value: 'Bolivian Boliviano' },
  };
  component.find('input').at(1).simulate('change', event);
  component.find('form').at(1).simulate('submit');

  expect(store.dispatch).toHaveBeenCalled();
});
