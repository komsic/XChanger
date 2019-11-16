import React from 'react';
import { mount } from 'enzyme';
import CurrencyChooser from './CurrencyChooser';
import ProviderTest from '../../ProviderTest';

it('should test if the the prop functions were called', () => {
  const onCurrencySelected = jest.fn();
  const event = {
    target: { value: 'Bolivian Boliviano' },
  };

  const component = mount(
    <ProviderTest>
      <CurrencyChooser
        list={[]}
        id="jss"
        currencyName="Nigerian Naira"
        onCurrencySelected={onCurrencySelected}
      />
    </ProviderTest>,
  );

  component.find('input').simulate('change', event);
  component.find('form').simulate('submit');
  expect(onCurrencySelected).toHaveBeenCalled();
});

it('should test if clear prop is present, then the input value should be cleared', () => {
  const onCurrencySelected = jest.fn();
  const event = {
    target: { value: 'Bolivian Boliviano' },
  };

  const component = mount(
    <ProviderTest>
      <CurrencyChooser
        list={[]}
        id="jss"
        currencyName="Nigerian Naira"
        clear
        onCurrencySelected={onCurrencySelected}
      />
    </ProviderTest>,
  );

  const input = component.find('input');

  input.simulate('change', event);
  component.find('form').simulate('submit');
  expect(input.text()).toEqual('');
});

it('should test if clear prop is present, then the input value should be cleared', () => {
  const onCurrencySelected = jest.fn();
  const event = {
    target: { value: 'bitcoin' },
  };

  const component = mount(
    <ProviderTest>
      <CurrencyChooser
        list={[]}
        id="jss"
        currencyName="Nigerian Naira"
        clear
        onCurrencySelected={onCurrencySelected}
      />
    </ProviderTest>,
  );

  const input = component.find('input');
  input.simulate('change', event);

  component.find('form').simulate('submit');
  expect(onCurrencySelected).toBeCalledTimes(0);
});
