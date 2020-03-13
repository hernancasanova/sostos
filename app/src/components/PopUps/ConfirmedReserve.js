import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'reactstrap';
import './style.css';
import { orderShow } from '../../actions/index';

class ConfirmedReserve extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
  }

  componentWillMount() {
    this.props.orderShow(this.props.match.params.id);
  }

  close(e) {
    this.props.history.push('/');
  }

  viewDetails(e) {
    this.props.history.push('/notifications');
  }


  render() {
    return (
      <div id="confirmed_reserve_modal" className="popup_message">
        <div>
          <Col sm={12}>
            <Row>
              <Col sm={12} className="modal-close-button-container">
                <button type="button" className="pull-right" onClick={e => this.close(e)}>X</button>
              </Col>

              <Col sm={12} className="lostar-logo-container">
                <img src="https://lorempixel.com/700/700/" alt="" />
              </Col>

              <Col sm={12} className="modal-title-container">
                <h4>
                  <FormattedMessage
                    id="modals.confirmed-reserve.title"
                    defaultMessage="Reservation process initiated"
                  />
                </h4>
              </Col>

              <Col sm={12} className="modal-body-container">
                <FormattedMessage
                  id="modals.confirmed-reserve.body"
                  defaultMessage="The partner in charge of the property has already been notified and we are waiting for your response so that you can enjoy this destination very soon."
                />
              </Col>

              <Col sm={12} className="modal-subbody-container">
                <FormattedMessage
                  id="modals.confirmed-reserve.subbody"
                  defaultMessage="The answer could take a couple of minutes, we are making sure that your destination is prepared for you."
                />
              </Col>

              <Col sm={12} className="modal-confirm-button-container">
                <button type="button" className="modal_boat lo_button_sec" onClick={e => this.close(e)}>
                  <FormattedMessage
                    id="modals.confirmed-reserve.accept"
                    defaultMessage="Accept"
                  />
                </button>
                <button type="button" className="modal_boat lo_button" onClick={e => this.viewDetails(e)}>
                  <FormattedMessage
                    id="modals.confirmed-reserve.view_details"
                    defaultMessage="View reservation details"
                  />
                </button>
              </Col>
            </Row>
          </Col>
        </div>
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
})(ConfirmedReserve);
