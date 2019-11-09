import React from 'react';
import { mount } from 'enzyme';
import CurrencyForm from './CurrencyForm';
import ProviderTest from '../../ProviderTest';

it('renders without crashing', () => {
  const handleCurrencyValueChange = jest.fn();
  const handleCurrencyNameChange = jest.fn();
  const event = {
    target: { value: 'the' },
  };

  const component = mount(
    <ProviderTest>
      <CurrencyForm
        id="jss"
        title="sdas"
        name="cuu"
        currencyName="ss"
        currencyValue="as"
        handleCurrencyValueChange={handleCurrencyValueChange}
        handleCurrencyNameChange={handleCurrencyNameChange}
      />
    </ProviderTest>,
  );
  component.find('input').at(0).simulate('change', event);
  component.find('input').at(1).simulate('change', event);
  expect(handleCurrencyValueChange).toBeCalledWith('the', 'cuu');
  expect(handleCurrencyNameChange).toHaveBeenCalled();
});
