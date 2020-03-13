import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import EditButtonIcon from '../../../assets/img/EditButton/edit_icon.png';
import { validateHistory } from '../../../validators';

class EditButton extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const { url, history, onClick } = this.props;
    if (url !== undefined) {
      history.push(url);
      return;
    }
    if (onClick) {
      onClick();
    }
  }

  render() {
    const { className } = this.props;
    return (
      <div className="EditButtonContainer">
        <button
          type="button"
          className={`EditButton ${className || ''}`}
          onClick={this.clickHandler}
        >
          <img src={EditButtonIcon} alt="Logo" />
        </button>
      </div>
    );
  }
}

export default EditButton;

EditButton.defaultProps = {
  className: false
};

EditButton.propTypes = {
  className: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  history: validateHistory.isRequired
};
