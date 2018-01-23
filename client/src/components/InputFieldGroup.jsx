import React from 'react';
import PropTypes from 'prop-types';

const InputFieldGroup = ({ field, value, type, errors, onChange, placeholder }) => (
  <div>
    <input
      type={type}
      name={field}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
    {errors && <span className="help-block red-errors">{errors}</span>}
  </div>
);

InputFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputFieldGroup.defaultProps = {
  type: 'text',
};

export default InputFieldGroup;
