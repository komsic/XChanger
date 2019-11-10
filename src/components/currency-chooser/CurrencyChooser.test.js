import React from 'react';
import { mount } from 'enzyme';
import CurrencyChooser from './CurrencyChooser';
import ProviderTest from '../../ProviderTest';

it('should test if the the prop functions were called', () => {
  const onCurrencySelect = jest.fn();
  const event = {
    target: { value: 'the' },
  };

  const component = mount(
    <ProviderTest>
      <CurrencyChooser
        id="jss"
        currencyName="Nigerian Naira"
        onCurrencySelect={onCurrencySelect}
      />
    </ProviderTest>,
  );

  component.find('input').simulate('change', event);
  component.find('form').simulate('submit');
  expect(onCurrencySelect).toBeCalledWith(event.target.value);
});

it('should test if clear prop is present, then the input value should be cleared', () => {
  const onCurrencySelect = jest.fn();
  const event = {
    target: { value: 'the' },
  };

  const component = mount(
    <ProviderTest>
      <CurrencyChooser
        id="jss"
        currencyName="Nigerian Naira"
        clear
        onCurrencySelect={onCurrencySelect}
      />
    </ProviderTest>,
  );

  const input = component.find('input');

  input.simulate('change', event);
  component.find('form').simulate('submit');
  expect(input.text()).toEqual('');
});
