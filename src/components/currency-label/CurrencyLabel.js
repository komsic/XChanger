import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../button/Button';
import cancelLogo from '../../assets/images/cancel.svg';
import './CurrencyLabel.css';
import { doRemoveCurrency } from '../../store/actions/currency';

const CurrencyLabel = ({ name, onDeleteItem }) => (
  <li className="currency-label">
    <p>{name}</p>

    <Button onClick={() => onDeleteItem(name)} classes="button--danger" isImg>
      <img src={cancelLogo} alt="cancel logo" />
    </Button>
  </li>
);

CurrencyLabel.propTypes = {
  name: PropTypes.string.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteItem: (name) => dispatch(doRemoveCurrency(name)),
});


export default connect(
  null,
  mapDispatchToProps,
)(CurrencyLabel);
