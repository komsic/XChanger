/* eslint-disable react/prop-types */
/* istanbul ignore file */
import React from 'react';
import { connect } from 'react-redux';
import { storiesOf } from '@storybook/react';

import Modal from './Modal';
import { doToggleModal } from '../../store/actions/ui';

const PropoComponent = ({ onModalCancelPressed }) => (
  <div>
    <button type="button" onClick={onModalCancelPressed}>Modal Cancel</button>
  </div>
);

const ConnectedModal = ({ onModalToggled }) => (
  <div>
    <button type="button" onClick={onModalToggled}>Show Modal</button>
    <Modal>
      <PropoComponent />
    </Modal>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  onModalToggled: () => dispatch(doToggleModal),
});

const C = connect(null, mapDispatchToProps)(ConnectedModal);

storiesOf('Modal', module)
  .add('default', () => <C />);
