import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const DefaultSelect = props => {
  const { error, onChange, options, placeholder, selectedValue, slim } = props;
  const selectedOption = options.find(option => option.value === selectedValue);
  const value = typeof selectedOption === 'undefined' ? options[0] : selectedOption;
  return (
    <React.Fragment>
      <Select
        slim={slim}
        options={options}
        placeholder={placeholder}
        className={slim ? 'basic-multi-select basic-multi-select-slim' : 'basic-multi-select'}
        classNamePrefix="select"
        onChange={onChange}
        value={value}
        isSearchable={false}
        inputProps={{
          autoComplete: 'none',
          autoFill: 'none',
          autoCorrect: 'none',
          spellCheck: 'none'
        }}
      />
      {error !== undefined && <div className="validator-error">{error}</div>}
    </React.Fragment>
  );
};

DefaultSelect.defaultProps = {
  error: false
};

DefaultSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  // selectedValue: PropTypes.string.isRequired,
  selectedValue: PropTypes.number.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired
};

export default DefaultSelect;
