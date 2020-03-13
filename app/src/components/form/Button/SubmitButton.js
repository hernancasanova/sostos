import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import {
  Button, Card, CardBody, CardImg, Col, Row, Label, Modal
} from 'reactstrap';
import './SubmitButton.css';
import { URL_STATIC } from '../../configs/configs';


class NewButton extends Component {
  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
  }

  goTo() {
    if (this.props.onClick !== undefined) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <div className="SubmitButtonContainer" onClick={this.goTo}>
        <button className="SubmitButton" onClick={this.clickHandler} >
          {this.props.text}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {
})(SubmitButton);
