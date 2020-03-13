import _ from 'lodash';
import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import ReactSelect, { components } from 'react-select';
import PropTypes from 'prop-types';
import './estilo.css';
import iconUser from '../../../assets/icons/lo-icon-user.svg';
import { URL_STATIC } from '../../../configs/configs';
import DefaultSelect from './defaultSelect';

const { Option, SingleValue } = components;

class Select extends Component {
  static renderError(error) {
    if (error !== undefined) {
      return <div className="validator-error">{error}</div>;
    }
  }

  constructor(props) {
    super(props);
    const { options, value } = this.props;
    const opt = _.find(options, { value });
    if (value !== undefined && value !== null && value !== '') {
      if (opt !== undefined) {
        this.state = {
          selectedValue: value,
          selectedLabel: opt.label
        };
      } else {
        this.state = {
          selectedValue: null,
          selectedLabel: 'Seleccionar...'
        };
      }
    } else {
      this.state = {
        selectedValue: null,
        selectedLabel: 'Seleccionar...'
      };
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { onChange } = this.props;
    this.setState({ selectedValue: e.value, selectedLabel: e.label });
    onChange(e.value);
  }

  render() {
    /* Options should be an array in this format:
     *  [{ value: value, label: name }, {...}]
     */
    const { options, placeholder, type, error, icon, value, slim } = this.props;
    const { selectedLabel, selectedValue } = this.state;
    if (type === undefined) {
      return (
        <DefaultSelect
          slim={slim}
          error={error}
          onChange={this.onChange}
          options={options}
          placeholder={placeholder}
          // selectedValue={selectedValue || value}
          selectedValue={value}
        />
      );
    }
    if (type === 'autocomplete-group') {
      const groupStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      };
      const groupBadgeStyles = {
        backgroundColor: '#EBECF0',
        borderRadius: '2em',
        color: '#172B4D',
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: '1',
        minWidth: 1,
        padding: '0.16666666666667em 0.5em',
        textAlign: 'center'
      };
      const formatGroupLabel = data => (
        <div style={groupStyles}>
          <span>{data.label}</span>
          <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
      );
      return (
        <React.Fragment>
          <ReactSelect
            options={options}
            formatGroupLabel={formatGroupLabel}
            onChange={this.reactSelectChange}
          />
          {this.renderError(error)}
        </React.Fragment>
      );
    }
    if (type === 'autocomplete-select') {
      return (
        <React.Fragment>
          <ReactSelect
            options={options}
            placeholder={selectedLabel || placeholder}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.onChange}
            value={selectedValue}
          />
          {this.renderError(error)}
        </React.Fragment>
      );
    }
    if (type === 'simple-select') {
      /**
       * [params options{value,label}]
       * @type  select
       */
      return (
        <React.Fragment>
          <ReactSelect
            options={options}
            placeholder={selectedLabel || placeholder}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.onChange}
            value={selectedValue}
            inputProps={{
              autoComplete: 'none',
              autoFill: 'none',
              autoCorrect: 'none',
              spellCheck: 'none'
            }}
            isSearchable={false}
          />
          {this.renderError(error)}
        </React.Fragment>
      );
    }
    if (type === 'simple-select-icon') {
      /**
       * [params options{value,label},icon(format svg)]
       * @type  select
       */
      const ValueContainer = ({ children, ...props }) =>
        components.ValueContainer && (
          <components.ValueContainer {...props}>
            {!!children && <SVG src={icon} style={{ position: 'absolute', left: 6 }} />}
            {children}
          </components.ValueContainer>
        );
      const styles = {
        valueContainer: base => ({
          ...base,
          paddingLeft: 30
        })
      };
      return (
        <React.Fragment>
          <ReactSelect
            options={options}
            placeholder={selectedLabel || placeholder}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.onChange}
            value={selectedValue}
            inputProps={{
              autoComplete: 'none',
              autoFill: 'none',
              autoCorrect: 'none',
              spellCheck: 'none'
            }}
            isSearchable={false}
            components={{ ValueContainer }}
            styles={styles}
          />
          {this.renderError(error)}
        </React.Fragment>
      );
    }
    if (type === 'image-select-round-item') {
      /**
       * [params options{value,label,filename}]
       * @type  select
       */
      const IconOption = props => (
        <Option {...props}>
          <img
            className="item-react-select-round"
            src={`${URL_STATIC}files/${props.data.filename}`}
            alt="sunil"
          />
          {props.data.label}
        </Option>
      );
      const SingleOption = props => (
        <SingleValue {...props}>
          <img
            className="item-react-select-round"
            src={`${URL_STATIC}files/${props.data.filename}`}
            alt="sunil"
          />
          {props.data.label}
        </SingleValue>
      );
      return (
        <React.Fragment>
          <ReactSelect
            options={options}
            className="basic-multi-select"
            placeholder={selectedLabel || placeholder}
            classNamePrefix="select"
            onChange={this.onChange}
            value={selectedValue}
            inputProps={{
              autoComplete: 'none',
              autoFill: 'none',
              autoCorrect: 'none',
              spellCheck: 'none'
            }}
            isSearchable={false}
            components={{ Option: IconOption, SingleValue: SingleOption }}
          />
          {this.renderError(error)}
        </React.Fragment>
      );
    }
    if (type === 'icon-select-item') {
      /**
       * [params options{value,label,iconSvg}]
       * @type  select
       */
      const IconOption = props => (
        <Option {...props}>
          <SVG src={iconUser} style={{ 'margin-left': '10px' }} />
          {props.data.label}
        </Option>
      );
      const SingleOption = props => (
        <SingleValue {...props}>
          <SVG src={iconUser} style={{ 'margin-left': '10px' }} />
          {props.data.label}
        </SingleValue>
      );
      return (
        <React.Fragment>
          <ReactSelect
            options={options}
            placeholder={selectedLabel || placeholder}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.onChange}
            value={selectedValue}
            inputProps={{
              autoComplete: 'none',
              autoFill: 'none',
              autoCorrect: 'none',
              spellCheck: 'none'
            }}
            isSearchable={false}
            components={{ Option: IconOption, SingleValue: SingleOption }}
          />
          {this.renderError(error)}
        </React.Fragment>
      );
    }
  }
}

Select.defaultProps = {
  type: undefined,
  placeholder: '',
  slim: false
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ).isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  slim: PropTypes.bool
};

export default Select;
