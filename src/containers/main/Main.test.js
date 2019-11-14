import React from 'react';
import { mount } from 'enzyme';
import Main from './Main';
import ProviderTest, { store } from '../../ProviderTest';

it('should test if the setCurrency was called when the currency length is 3', () => {
  const component = mount(
    <ProviderTest>
      <Main />
    </ProviderTest>,
  );

  component.find('input').simulate('change', {
    target: { value: 'USD' },
  });
  expect(store.dispatch).toHaveBeenCalled();
});

it('should test if the the prop function was called', () => {
  const component = mount(
    <ProviderTest>
      <Main />
    </ProviderTest>,
  );

  component.find('input').simulate('change', {
    target: { value: 'US' },
  });
  expect(store.dispatch).toHaveBeenCalled();
});

it('should test if the the prop function was called', () => {
  const component = mount(
    <ProviderTest>
      <Main />
    </ProviderTest>,
  );

  component.find('input').simulate('change', {
    target: { value: 'USX' },
  });
  expect(store.dispatch).toHaveBeenCalled();
});
