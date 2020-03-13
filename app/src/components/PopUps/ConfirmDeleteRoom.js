import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'reactstrap';
import './style.css';
import { orderShow } from '../../actions/index';

class ConfirmDeleteRoom extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.delete = this.delete.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  close(e) {
    if (this.props.onClose !== undefined) {
      this.props.onClose(e);
    }
  }

  delete(e) {
    if (this.props.onConfirm !== undefined) {
      this.props.onConfirm(e);
    }
  }

  cancel(e) {
    if (this.props.onCancel !== undefined) {
      this.props.onCancel(e);
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
                  id="modals.confirm_delete_room.title"
                  defaultMessage="Reservation process initiated"
                />
              </h4>
            </Col>

            <Col sm={12} className="modal-body-container">
              <FormattedMessage
                id="modals.confirm_delete_room.body"
                defaultMessage="The partner in charge of the property has already been notified and we are waiting for your response so that you can enjoy this destination very soon."
              />
            </Col>


            <Col sm={12} className="modal-confirm-button-container">
              <button type="button" className="modal_boat white_lo_button" onClick={e => this.delete(e)}>
                <FormattedMessage
                  id="modals.confirm_delete_room.delete"
                  defaultMessage="Accept"
                />
              </button>
              <button type="button" className="modal_boat lo_button" onClick={e => this.cancel(e)}>
                <FormattedMessage
                  id="modals.confirm_delete_room.cancel"
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
})(ConfirmDeleteRoom);
