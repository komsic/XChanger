import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../components/button/Button';

import './Header.css';
import { doToggleModal } from '../../store/actions/ui';

const Header = ({ onModalToggled }) => (
  <div className="header-container">
    <header className="header">
      <h1 className="header__title">XChanger</h1>

      <Button onClick={onModalToggled} classes="button--primary">Manage Currencies</Button>
    </header>
  </div>
);

Header.propTypes = {
  onModalToggled: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onModalToggled: () => dispatch(doToggleModal),
});


export default connect(
  null,
  mapDispatchToProps,
)(Header);
