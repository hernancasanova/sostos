import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'reactstrap';
import './style.css';


class ConfirmBoatReserve extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.reserveBoat = this.reserveBoat.bind(this);
    this.notNow = this.notNow.bind(this);
  }

  closeModal(e) {
    if (this.props.onClose) this.props.onClose(e);
  }

  reserveBoat(e) {
    if (this.props.onConfirm) this.props.onConfirm(e);
  }

  notNow(e) {
    if (this.props.onDecline) this.props.onDecline(e);
  }

  render() {
    return (
      <Row>
        <Col sm={6}>
          <img src="https://lorempixel.com/700/700" alt="" />
        </Col>
        <Col sm={6} className="modal_boat_right_side">
          <div className="modal-close-button-container">
            <button className="pull-right" onClick={e => this.closeModal(e)}>X</button>
          </div>
          <div className="modal-title-container">
            <h3>
              <FormattedMessage
                id="modals.boat-confirm.title"
                defaultMessage="Do you want to reserve a boat?"
              />
            </h3>
          </div>

          <div className="modal-body-container">
            <FormattedMessage
              id="modals.boat-confirm.body"
              defaultMessage="Complementa tu estadia lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s."
            />
          </div>

          <div className="modal-confirm-button-container">
            <button className="modal_boat lo_button" onClick={e => this.reserveBoat(e)}>
              <FormattedMessage
                id="modals.boat-confirm.reserve"
                defaultMessage="I want to reserve"
              />
            </button>
          </div>
          <div className="modal-not-now-button-container">
            <button className="modal_boat lo_link" onClick={e => this.notNow(e)}>
              <FormattedMessage
                id="modals.boat-confirm.notnow"
                defaultMessage="Maybe later"
              />
            </button>
          </div>
        </Col>
      </Row>
    );
  }
}


export default ConfirmBoatReserve;
