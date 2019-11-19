import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Card.css';
import { getRates, getBaseCurrencyCode, getLoadingStatus } from '../../store/selectors/currency';

const Card = ({
  card: { symbol, name, code }, getRate, baseCurrencyCode, loading,
}) => (
  <li className="card">
    <div className="card__header">
      <p className={`medium ${loading ? 'glower' : ''}`}>{symbol}</p>

      <p className={`large ${loading ? 'glower' : ''}`}>{code}</p>
    </div>

    <p className={`large name ${loading ? 'glower' : ''}`}>{name}</p>

    <p
      className={`big rate ${loading ? 'glower' : ''}`}
    >
      {`1 ${baseCurrencyCode} - ${getRate(code)} ${code}`}
    </p>
  </li>
);

Card.propTypes = {
  card: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  getRate: PropTypes.func.isRequired,
  baseCurrencyCode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  loading: getLoadingStatus(state),
  getRate: getRates(state),
  baseCurrencyCode: getBaseCurrencyCode(state),
});

export default connect(
  mapStateToProps,
)(Card);
