import React from 'react';
import { mount } from 'enzyme';
import ProviderTest from '../../ProviderTest';
import Hero, {
  INITIAL_STATE, heroReducer, CURRENCY_NAME_CHANGE, CURRENCY_VALUE_CHANGE, getCurrency,
} from './Hero';

describe('heroReducer', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = INITIAL_STATE('NGN', 'USD');
  });

  it('should return disabled as false since value length is 3', () => {
    const expectedState = heroReducer(initialState, {
      type: CURRENCY_NAME_CHANGE,
      value: 'XGN',
      name: 'currencyOne',
      isNull: () => true,
    });

    expect(expectedState).toEqual({
      ...initialState,
      disabled: false,
      currencies: { ...initialState.currencies, currencyOne: 'XGN' },
    });
  });

  it('should return disabled as true since value length is less than 3', () => {
    const expectedState = heroReducer(initialState, {
      type: CURRENCY_NAME_CHANGE,
      value: 'XG',
      name: 'currencyOne',
      isNull: () => true,
    });

    expect(expectedState).toEqual({
      ...initialState,
      disabled: true,
      currencies: { ...initialState.currencies, currencyOne: 'XG' },
    });
  });

  it('should return itself if no action\'s type is an empty string', () => {
    expect(heroReducer(initialState, { type: '' })).toEqual(initialState);
  });

  it('should return money as value', () => {
    const expectedState = heroReducer(initialState, {
      type: CURRENCY_VALUE_CHANGE,
      value: '10',
      name: 'currencyOne',
    });

    expect(expectedState.money).toEqual('10');
  });
});

describe('getCurrency', () => {
  it('return money if the current and currentCurrency are equal', () => {
    expect(getCurrency('currencyOne', 'currencyOne', 10, 20)).toEqual(10);
  });

  it('return otherMoney if the current and currentCurrency are not equal', () => {
    expect(getCurrency('currencyOne', 'currencyTwo', 10, 20)).toEqual(20);
  });
});

describe('<Hero />', () => {
  it('', () => {
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    useReducerSpy.mockImplementation(() => [dispatch]);

    const component = mount(
      <ProviderTest>
        <Hero />
      </ProviderTest>,
    );

    const eventOne = {
      target: { value: '100' },
    };

    const eventTwo = {
      target: { value: 'BAM' },
    };

    const inputTwo = component.find('input').at(1);
    const inputOne = component.find('input').at(0);

    inputTwo.simulate('change', eventTwo);
    inputOne.simulate('change', eventOne);

    expect(inputOne.text()).toEqual('');
    expect(inputTwo.text()).toEqual('');
  });
});
