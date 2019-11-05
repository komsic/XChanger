import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

const Card = ({
  card: {
    symbol, name, code, rate, otherCurrencyCode,
  },
}) => (
  <li className="card">
    <div className="card__header">
      <p className="medium">{symbol}</p>

      <p className="large">{code}</p>
    </div>

    <p className="medium">{name}</p>

    <p className="large">{`1 ${otherCurrencyCode} - ${rate} ${code}`}</p>
  </li>
);

Card.propTypes = {
  card: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    otherCurrencyCode: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
