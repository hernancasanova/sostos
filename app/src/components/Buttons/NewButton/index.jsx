/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NewButton = props => {
  const { className, text, url, onClick, disabled } = props;
  if (onClick) {
    return (
      <div onClick={onClick} role="button" tabIndex={0} className="NewButtonContainer">
        <button disabled={disabled} type="button" className={`NewButton ${className}`}>
          {text}
        </button>
      </div>
    );
  }
  return (
    <Link to={url}>
      <div role="button" tabIndex={0} className="NewButtonContainer">
        <button disabled={disabled} type="button" className={`NewButton ${className}`}>
          {text}
        </button>
      </div>
    </Link>
  );
};

NewButton.defaultProps = {
  className: '',
  url: '/',
  onClick: null
};

NewButton.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default NewButton;
