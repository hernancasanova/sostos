import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'reactstrap';
import './style.css';
import { orderShow } from '../../actions/index';
import { Input } from '../form';

class ConfirmedDelete extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  close(e) {
    if (this.props.onClose !== undefined) {
      this.props.onClose(e);
    }
  }

  confirm(e) {
    if (this.props.onConfirm !== undefined) {
      this.props.onConfirm(e);
    }
  }


  render() {
    return (
      <div>
        <Col sm={12}>
          <Row>
            <Col sm={12} className="modal-close-button-container">
              <button type="button" className="pull-right" onClick={e => this.close(e)}>X</button>
            </Col>

            <Col sm={12} className="img-container">
              <img src="https://lorempixel.com/700/700/" alt="" />
            </Col>

            <Col sm={12} className="modal-title-container">
              <h4>
                <FormattedMessage
                  id="modals.confirmed_delete.title"
                  defaultMessage="Reservation process initiated"
                />
              </h4>
            </Col>

            <Col sm={12} className="modal-body-container">
              <FormattedMessage
                id="modals.confirmed_delete.body"
                defaultMessage="The partner in charge of the property has already been notified and we are waiting for your response so that you can enjoy this destination very soon."
              />
            </Col>

            <Col sm={12} className="modal-confirm-button-container">
              <button type="button" className="modal_boat lo_button" onClick={e => this.confirm(e)}>
                <FormattedMessage
                  id="modals.confirmed_delete.accept"
                  defaultMessage="View reservation details"
                />
              </button>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
  auth: state.auth,
  user: state.user,
  loading: state.order.loading
});

export default connect(mapStateToProps, {
  orderShow
})(ConfirmedDelete);
