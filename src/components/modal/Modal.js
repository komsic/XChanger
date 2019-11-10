import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Modal.css';
import { getModalStatus } from '../../store/selectors/ui';
import { doToggleModal } from '../../store/actions/ui';

const Modal = ({ children, modalStatus, onModalToggled }) => (
  <div className={`modal ${modalStatus}`}>
    {React.cloneElement(children, { onModalCancelPressed: () => onModalToggled() })}
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  modalStatus: PropTypes.string.isRequired,
  onModalToggled: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modalStatus: getModalStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onModalToggled: () => dispatch(doToggleModal),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
