import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({
  children, classes, isImg, onClick, type,
}) => (
  // eslint-disable-next-line react/button-has-type
  <button
    type={type}
    onClick={onClick}
    className={`${isImg ? 'button-image' : 'button'} ${classes}`}
  >
    {children}
  </button>
);

Button.propTypes = {
  classes: PropTypes.string,
  isImg: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  classes: '',
  isImg: false,
  type: 'button',
  onClick: undefined,
};

export default Button;
