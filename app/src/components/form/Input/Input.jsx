import React, { Component } from 'react';
import { Input as Input2, InputGroup, Row, Col } from 'reactstrap';
// import Ionicon from 'react-ionicons';
import SVG from 'react-inlinesvg';
import PhoneInput from 'react-phone-number-input';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import placeholders from '../../../translations/form/placeholders';
import './style.css';
import 'react-phone-number-input/style.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.checkChange = this.checkChange.bind(this);
  }

  /* Boolean checkbox handler */
  checkChange(checked) {
    const { onChange } = this.props;
    if (onChange !== undefined) {
      onChange(checked);
    }
  }

  /* Render input depending on type */
  renderInput() {
    const {
      placeholder,
      onChange,
      className,
      type,
      value,
      name,
      error,
      readOnly,
      icon,
      rows,
      id,
      classNameContainer,
      autoFocus
    } = this.props;
    const lang = 'es';
    switch (type) {
      // #region boolean-checkbox
      case 'boolean-checkbox':
        return (
          <div>
            <Row className="lo-boolean-checkbox">
              <Col
                md="3"
                className="lo-boolean-checkbox-container"
                onClick={() => this.checkChange(true)}
              >
                <div>
                  <Checkbox
                    id="cbox_yes"
                    className="yes_no_checkbox"
                    checked={value}
                    cboxType="yes_no"
                  />
                </div>
                <div className="lo-boolean-checkbox-placeholder">{placeholders[lang].yes}</div>
              </Col>
              <Col
                md="3"
                className="lo-boolean-checkbox-container"
                onClick={() => this.checkChange(false)}
              >
                <div>
                  <Checkbox
                    id="cbox_no"
                    className="yes_no_checkbox"
                    checked={!value}
                    cboxType="yes_no"
                  />
                </div>
                <div className="lo-boolean-checkbox-placeholder">{placeholders[lang].no}</div>
              </Col>
            </Row>
          </div>
        );
      // #endregion
      // #region text
      case 'text':
        return (
          <div>
            <InputGroup className={`input-group input-custom-text ${classNameContainer}`}>
              <Input2
                autoFocus={autoFocus}
                className={className}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value || ''}
                onChange={onChange}
                invalid={error !== false}
                readOnly={readOnly}
              />
            </InputGroup>
          </div>
        );
      // #endregion
      // #region text-icon
      case 'text-icon':
        return (
          <div>
            <InputGroup className="input-group">
              <SVG src={icon} className="text-icon-input" />
              <Input2
                className={className}
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                invalid={error !== undefined}
                readOnly={readOnly}
              />
            </InputGroup>
          </div>
        );
      // #endregion
      // #region textarea
      case 'textarea':
        return (
          <div>
            <InputGroup className="input-group">
              <Input2
                className={className}
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                rows={rows}
                value={value || ''}
                onChange={onChange}
                invalid={typeof error !== 'undefined' || error !== false}
                readOnly={readOnly}
              />
            </InputGroup>
          </div>
        );
      // #endregion
      // #region phone-number
      case 'phone-number':
        return (
          <div>
            <InputGroup className="input-group">
              <PhoneInput type={type} placeholder={placeholder} value={value} onChange={onChange} />
            </InputGroup>
          </div>
        );
      // #endregion
      // #region checkbox
      case 'checkbox':
        return (
          <div>
            <Checkbox checked={value} />
          </div>
        );
      // #endregion
      // #region default
      default:
        return (
          <div>
            <InputGroup className="input-group">
              <Input2
                className={className}
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value || ''}
                onChange={onChange}
                invalid={error !== undefined}
                readOnly={readOnly}
              />
            </InputGroup>
          </div>
        );
      // #endregion
    }
  }

  render() {
    const { error } = this.props;
    return (
      <React.Fragment>
        {this.renderInput()}
        {error && <div className="validator-error">{error}</div>}
      </React.Fragment>
    );
  }
}

Input.defaultProps = {
  error: false,
  className: '',
  name: '',
  readOnly: false,
  placeholder: '',
  value: '',
  classNameContainer: '',
  autoFocus: false
};

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  name: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  readOnly: PropTypes.bool,
  classNameContainer: PropTypes.string,
  autoFocus: PropTypes.bool
};

export default Input;
