import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';
import ProviderTest, { store } from '../../ProviderTest';

it('should test if the the prop functions were called', () => {
  const component = mount(
    <ProviderTest>
      <Header />
    </ProviderTest>,
  );

  component.find('button').simulate('click');
  expect(store.dispatch).toHaveBeenCalled();
});
