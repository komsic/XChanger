import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Card.css';
import { getRates, getBaseCurrencyCode } from '../../store/selectors/currency';

const Card = ({ card: { symbol, name, code }, getRate, baseCurrencyCode }) => (
  <li className="card">
    <div className="card__header">
      <p className="medium">{symbol}</p>

      <p className="large">{code}</p>
    </div>

    <p className="large name">{name}</p>

    <p className="big rate">{`1 ${baseCurrencyCode} - ${getRate(code)} ${code}`}</p>
  </li>
);

Card.propTypes = {
  card: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  getRate: PropTypes.func.isRequired,
  baseCurrencyCode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getRate: getRates(state),
  baseCurrencyCode: getBaseCurrencyCode(state),
});

export default connect(
  mapStateToProps,
)(Card);
