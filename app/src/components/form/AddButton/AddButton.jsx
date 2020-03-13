import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import './style.css';

class AddButton extends Component {
  handleClick(event) {
    const { onClick } = this.props;
    if (onClick !== undefined) {
      onClick(event);
    }
  }

  render() {
    const { defaultMessage } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col md="12" onClick={e => this.handleClick(e)} className="add_button">
            <div className="add_button_btn">
              <div className="add_button_content"> + </div>
            </div>

            <div className=" add_content_text">{defaultMessage}</div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  defaultMessage: PropTypes.string.isRequired
};

export default AddButton;
