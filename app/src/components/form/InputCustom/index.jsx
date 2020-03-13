import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import Input from '../Input/Input';

const InputCustom = props => {
  const {
    classNameInput,
    classNameContainer,
    labelWidth,
    inputWidth,
    label,
    type,
    placeholder,
    value,
    onChange,
    name,
    error,
    autoFocus
  } = props;
  return (
    <Row>
      <Col sm={labelWidth} className="FormLabel">
        {label}
      </Col>
      <Col sm={inputWidth}>
        <Input
          autoFocus={autoFocus}
          classNameContainer={classNameContainer}
          className={classNameInput}
          error={error}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

InputCustom.defaultProps = {
  label: '',
  type: '',
  placeholder: '',
  value: '',
  error: false,
  labelWidth: 3,
  inputWidth: 9,
  classNameInput: '',
  autoFocus: false
};

InputCustom.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  labelWidth: PropTypes.number,
  inputWidth: PropTypes.number,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  classNameInput: PropTypes.string,
  autoFocus: PropTypes.bool
};

export default InputCustom;
