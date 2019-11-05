import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({
  children, classes, isImg, onClick,
}) => (
  <button
    type="button"
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
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  classes: '',
  isImg: false,
};

export default Button;
