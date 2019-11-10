import React from 'react';
import { mount } from 'enzyme';
import Modal from './Modal';
import ProviderTest, { store } from '../../ProviderTest';

it('should test if the the prop functions were called', () => {
  // eslint-disable-next-line react/prop-types
  const PropoComponent = ({ onModalCancelPressed }) => (
    <div>
      <button type="button" onClick={onModalCancelPressed}>Modal Cancel</button>
    </div>
  );

  const component = mount(
    <ProviderTest>
      <Modal>
        <PropoComponent />
      </Modal>
    </ProviderTest>,
  );

  component.find('button').simulate('click');
  expect(store.dispatch).toHaveBeenCalled();
});
