import React from 'react';
import PropTypes from 'prop-types';

import './DropdownInput.css';
import dropdownLogo from '../../assets/images/dropdown.svg';

const DropdownInput = ({
  maxLength, name, onChange, value, placeholder, list, id, classes,
  isDataListPresent, showValueAsCode, status,
}) => (
  <div className={`dropdown-input ${classes}`}>
    <input
      className={status ? 'error' : ''}
      maxLength={maxLength}
      onChange={onChange}
      name={name}
      value={value}
      type="text"
      placeholder={placeholder}
      list={id}
    />

    {isDataListPresent && (
    <datalist id={id}>
      {list.map((item) => (
        <option
          key={item.code}
          value={showValueAsCode ? item.code : item.name}
        >
          {showValueAsCode ? item.name : item.code}
        </option>
      ))}
    </datalist>
    )}

    <img src={dropdownLogo} alt="dropdown logo" />
  </div>
);

DropdownInput.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isDataListPresent: PropTypes.bool,
  showValueAsCode: PropTypes.bool,
  status: PropTypes.bool,
  classes: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DropdownInput.defaultProps = {
  maxLength: 35,
  name: '',
  placeholder: '',
  isDataListPresent: true,
  showValueAsCode: false,
  status: false,
  classes: '',
};

export default DropdownInput;
