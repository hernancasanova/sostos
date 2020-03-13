/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DeleteButton = props => {
  const { className, text, url, onClick, disabled, style } = props;
  if (onClick) {
    return (
      <div onClick={onClick} role="button" tabIndex={0} className="NewButtonContainer">
        <button
          style={style || {}}
          disabled={disabled}
          type="button"
          className={`DeleteButton ${className}`}
        >
          {text}
        </button>
      </div>
    );
  }
  return (
    <Link to={url}>
      <div role="button" tabIndex={0} className="NewButtonContainer">
        <button
          style={style || {}}
          disabled={disabled}
          type="button"
          className={`DeleteButton ${className}`}
        >
          {text}
        </button>
      </div>
    </Link>
  );
};

DeleteButton.defaultProps = {
  className: '',
  url: '/',
  onClick: null,
  disabled: false,
  style: false
};

DeleteButton.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.shape({})
};

export default DeleteButton;
