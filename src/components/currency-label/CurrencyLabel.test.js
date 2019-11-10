import React from 'react';
import { mount } from 'enzyme';
import CurrencyLabel from './CurrencyLabel';
import ProviderTest, { store } from '../../ProviderTest';

it('should test if the the prop functions were called', () => {
  const component = mount(
    <ProviderTest>
      <CurrencyLabel
        name="(NGN) Nigerian Naira"
      />
    </ProviderTest>,
  );

  component.find('button').simulate('click');
  expect(store.dispatch).toHaveBeenCalled();
});
