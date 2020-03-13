import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Button, Col, Row, Label
} from 'reactstrap';
import SVG from 'react-inlinesvg';

import {
  orderUpdate
} from '../../actions/index';

import {
  Input
} from '../form';
import { URL_STATIC } from '../../configs/configs';
import iconPlus from '../../assets/icons/lo-icon-plus.svg';
import iconMinus from '../../assets/icons/lo-icon-minus.svg';
import iconMarker from '../../assets/icons/lo-icon-marker.svg';
import iconUser from '../../assets/icons/lo-icon-user.svg';
import iconCalendar from '../../assets/icons/lo-icon-calendar.svg';
import iconChat from '../../assets/icons/lo-icon-chats.svg';
import iconCode from '../../assets/icons/lo-icon-barcode.svg';
import iconWallet from '../../assets/icons/lo_icon_wallet.svg';
import iconCheck from '../../assets/icons/lo-icon-check-white.svg';
import iconArrow from '../../assets/icons/lo-icon-arrow_right.svg';
import './style.css';

class ReservationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBottomDescriptionOpen: false
    };

    this.toggleCard = this.toggleCard.bind(this);
    this.renderBadge = this.renderBadge.bind(this);
    this.goToPayment = this.goToPayment.bind(this);
    this.viewReceipt = this.viewReceipt.bind(this);
    this.moreOptions = this.moreOptions.bind(this);
    this.reserveAgain = this.reserveAgain.bind(this);
    this.acceptReserve = this.acceptReserve.bind(this);
    this.rejectReserve = this.rejectReserve.bind(this);
    this.chatWithLivingOver = this.chatWithLivingOver.bind(this);
    this.renderBottomDescription = this.renderBottomDescription.bind(this);
    this.renderGuests = this.renderGuests.bind(this);
  }

  toggleCard() {
    this.setState(prev => ({
      isBottomDescriptionOpen: !prev.isBottomDescriptionOpen
    }));
  }

  goToPayment(e) {
    this.props.history.push(`/checkout/${this.props.id}`);
  }

  chatWithLivingOver(e) {
    console.log('CHAT WHIT LO');
    // this.props.history.push('order)');
  }

  reserveAgain(e) {
    console.log('RESERVE AGAIN');
  }

  moreOptions(e) {
    console.log('MORE OPTIONS');
  }

  acceptReserve(e) {
    const payload = {
      id: this.props.id,
      status: 'approved',
      refreshOrders: true
    };
    this.props.orderUpdate(payload);
    if (this.props.updateCallback !== undefined) {
      this.props.updateCallback();
    }
  }

  rejectReserve() {
    const payload = {
      id: this.props.id,
      status: 'rejected',
      refreshOrders: true
    };
    this.props.orderUpdate(payload);
    if (this.props.updateCallback !== undefined) {
      this.props.updateCallback();
    }
  }

  viewReceipt() {
    console.log('VIEW RECEIPT');
  }

  getUserNameOrEmail(user) {
    let res = '';
    if (user.firstName !== undefined && user.lastName !== undefined) {
      if (user.firstName !== null) {
        res = user.firstName;
      }
      if (user.firstName !== null && user.lastName !== null) {
        res += ` ${user.lastName}`;
        return res;
      }
      if (user.firstName === null && user.lastName === null) {
        return user.email;
      }
    } else if (user.email !== undefined) {
      return user.email;
    }
    return 'ERROR NAME';
  }

  getUserCityCountry(user) {
    let res = '';
    if (user.city !== null && user.city !== '') {
      res = user.city;
    }
    if (user.city !== null && user.country !== null && user.city !== '' && user.country !== '') {
      res += `, ${user.country}`;
      return res;
    }

    if (res === '') {
      return (
        <FormattedMessage
          id="reservation_card.not_informed"
          default="Not informed"
        />
      );
    }
    return res;
  }

  renderBottomDescription(status) {
    switch (status) {
      case 'approved':
        return (
          <Col sm={12}>
            { this.state.isBottomDescriptionOpen && (
            <Row>
              <p className="reservation_bottom_desc">
                {this.props.description}
              </p>
            </Row>

            )}

            <Row>
              <Col sm={6} className="gotopayment_button">
                <button className="green_lo_button" onClick={this.goToPayment}>
                  <SVG src={iconWallet} />
                  <FormattedMessage
                    id="reservation_card.button.gotopayment"
                    defaultMessage="Go to payment"
                  />
                </button>
              </Col>
            </Row>

          </Col>
        );
        break;


      case 'pending':
        return (
          <Col sm={12}>
            { this.state.isBottomDescriptionOpen && (
            <Row>
              <p className="reservation_bottom_desc">
                {this.props.description}
              </p>
            </Row>

            )}

            <Row>
              <Col sm={6} className="chatwithlo_button_container">
                <button className="white_lo_button" onClick={this.chatWithLivingOver}>
                  <SVG src={iconChat} />
                  <FormattedMessage
                    id="reservation_card.button.chatwithlo"
                    defaultMessage="Go to payment"
                  />
                </button>
              </Col>
            </Row>

          </Col>
        );
        break;

      case 'cancelled':
        return (
          <Col sm={12}>
            { this.state.isBottomDescriptionOpen && (
            <Row>
              <p className="reservation_bottom_desc">
                {this.props.description}
              </p>
            </Row>

            )}

            <Row>
              <Col sm={12} className="chat_tryagain_container">
                <button className="white_lo_button" onClick={this.reserveAgain}>
                  <FormattedMessage
                    id="reservation_card.button.try_again"
                    defaultMessage="Go to payment"
                  />
                </button>

                <button className="white_lo_button" onClick={this.chatWithLivingOver}>
                  <SVG src={iconChat} />
                  <FormattedMessage
                    id="reservation_card.button.chatwithlo"
                    defaultMessage="Go to payment"
                  />
                </button>
              </Col>

            </Row>

          </Col>
        );
        break;

      case 'rejected':
        return (
          <Col sm={12}>
            { this.state.isBottomDescriptionOpen && (
            <Row>
              <p className="reservation_bottom_desc">
                {this.props.description}
              </p>
            </Row>

            )}

            <Row>
              <Col sm={12} className="chat_more_options_container">
                <button className="white_lo_button" onClick={this.moreOptions}>
                  <FormattedMessage
                    id="reservation_card.button.more_options"
                    defaultMessage="Go to payment"
                  />
                </button>

                <button className="white_lo_button" onClick={this.chatWithLivingOver}>
                  <SVG src={iconChat} />
                  <FormattedMessage
                    id="reservation_card.button.chatwithlo"
                    defaultMessage="Go to payment"
                  />
                </button>
              </Col>

            </Row>

          </Col>
        );
        break;

      case 'payed':
        return (
          <Col sm={12}>
            { this.state.isBottomDescriptionOpen && (
            <Row>
              <p className="reservation_bottom_desc">
                {this.props.description}
              </p>
            </Row>

            )}

            <Row>
              <Col sm={6} className="gotopayment_button">
                <button className="lo_button" onClick={this.viewReceipt}>
                  <SVG src={iconWallet} />
                  <FormattedMessage
                    id="reservation_card.button.view_receipt"
                    defaultMessage="Go to payment"
                  />
                </button>
              </Col>
            </Row>

          </Col>
        );
        break;


      case 'partner_pending':
        return (
          <Col sm={12}>
            { this.state.isBottomDescriptionOpen && (
              <React.Fragment>
                <Row>
                  <p className="reservation_bottom_desc">
                Esta propiedad esta a la espera de aprobación, lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                  </p>

                </Row>
                <Row className="user_profile_container">
                  <div className="user_img_container">
                    <img src={`${URL_STATIC}files/${this.props.orderUser.picture.filename}`} alt="" />
                  </div>
                  <div className="user_data_container">
                    <Row className="user_data_name">
                      {this.getUserNameOrEmail(this.props.orderUser)}
                    </Row>
                    <Row className="user_data_city">
                      {this.getUserCityCountry(this.props.orderUser)}
                    </Row>
                  </div>
                </Row>
              </React.Fragment>

            )}
            {this.props.order.status !== 'approved' && this.props.order.status !== 'rejected' ? (
              <Row>
                <Col sm={6} className="accept_reserve_container">
                  <button className="green_lo_button" onClick={e => this.acceptReserve()}>
                    <SVG src={iconCheck} />
                    <FormattedMessage
                      id="reservation_card.button.accept"
                      defaultMessage="Go to payment"
                    />
                  </button>
                </Col>
                <Col sm={6} className="reject_reserve_container">
                  <button className="white_lo_button" onClick={e => this.rejectReserve()}>
                    <FormattedMessage
                      id="reservation_card.button.reject"
                      defaultMessage="Go to payment"
                    />
                  </button>
                </Col>
              </Row>
            ) : '' }

          </Col>
        );
        break;

      case 'partner_rejected':
        return (
          <Col sm={12}>
            { this.state.isBottomDescriptionOpen && (
              <React.Fragment>
                <Row>
                  <p className="reservation_bottom_desc">
                Esta propiedad esta a la espera de aprobación, lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                  </p>

                </Row>
                <Row className="user_profile_container partner">
                  <div className="user_img_container">
                    <img src={`${URL_STATIC}files/${this.props.orderUser.picture.filename}`} alt="" />
                  </div>
                  <div className="user_data_container">
                    <Row className="user_data_name">
                      {this.getUserNameOrEmail(this.props.orderUser)}
                    </Row>
                    <Row className="user_data_city">
                      {this.getUserCityCountry(this.props.orderUser)}
                    </Row>
                  </div>
                </Row>

              </React.Fragment>

            )}


          </Col>
        );
        break;

      case 'partner_cancelled':
        return (
          <Col sm={12}>
            { this.state.isBottomDescriptionOpen && (
              <React.Fragment>
                <Row>
                  <p className="reservation_bottom_desc">
                Esta propiedad esta a la espera de aprobación, lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                  </p>

                </Row>
                <Row className="user_profile_container partner">
                  <div className="user_img_container">
                    <img src={`${URL_STATIC}files/${this.props.orderUser.picture.filename}`} alt="" />
                  </div>
                  <div className="user_data_container">
                    <Row className="user_data_name">
                      {this.getUserNameOrEmail(this.props.orderUser)}
                    </Row>
                    <Row className="user_data_city">
                      {this.getUserCityCountry(this.props.orderUser)}
                    </Row>
                  </div>
                </Row>

              </React.Fragment>

            )}
          </Col>
        );
        break;

      case 'partner_payed':
        return (
          <Col sm={12}>
            { this.state.isBottomDescriptionOpen && (
              <React.Fragment>
                <Row>
                  <p className="reservation_bottom_desc">
                Esta propiedad esta a la espera de aprobación, lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                  </p>

                </Row>
                <Row className="user_profile_container">
                  <div className="user_img_container">
                    <img src={`${URL_STATIC}files/${this.props.orderUser.picture.filename}`} alt="" />
                  </div>
                  <div className="user_data_container">
                    <Row className="user_data_name">
                      {this.getUserNameOrEmail(this.props.orderUser)}
                    </Row>
                    <Row className="user_data_city">
                      {this.getUserCityCountry(this.props.orderUser)}
                    </Row>
                  </div>
                </Row>

                <Row>
                  <Col sm={6} className="gotopayment_button">
                    <button className="lo_button" onClick={this.viewReceipt}>
                      <SVG src={iconWallet} />
                      <FormattedMessage
                        id="reservation_card.button.view_receipt"
                        defaultMessage="Go to payment"
                      />
                    </button>
                  </Col>
                </Row>
              </React.Fragment>

            )}
          </Col>
        );
        break;

      case 'partner_approved':
        return (
          <Col sm={12}>
            { this.state.isBottomDescriptionOpen && (
              <React.Fragment>
                <Row>
                  <p className="reservation_bottom_desc">
                Esta propiedad esta a la espera de aprobación, lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                  </p>

                </Row>
                <Row className="user_profile_container partner">
                  <div className="user_img_container">
                    <img src={`${URL_STATIC}files/${this.props.orderUser.picture.filename}`} alt="" />
                  </div>
                  <div className="user_data_container">
                    <Row className="user_data_name">
                      {this.getUserNameOrEmail(this.props.orderUser)}
                    </Row>
                    <Row className="user_data_city">
                      {this.getUserCityCountry(this.props.orderUser)}
                    </Row>
                  </div>
                </Row>

              </React.Fragment>

            )}


          </Col>
        );
        break;
    }
  }

  renderBadge(badge) {
    switch (badge) {
      case 'approved':
      case 'partner_approved':
        return (
          <div className="reservation_badge approved">
            <FormattedMessage
              id="reservation_card.approved"
              defaultmessage="Approved"
            />
          </div>
        );
        break;

      case 'pending':
      case 'partner_pending':
        return (
          <div className="reservation_badge pending">
            <FormattedMessage
              id="reservation_card.pending"
              defaultmessage="Pending"
            />
          </div>
        );
        break;


      case 'payed':
      case 'partner_payed':
        return (
          <div className="reservation_badge payed">
            <FormattedMessage
              id="reservation_card.payed"
              defaultmessage="Payed"
            />
          </div>
        );
        break;

      case 'rejected':
      case 'partner_rejected':
        return (
          <div className="reservation_badge rejected">
            <FormattedMessage
              id="reservation_card.rejected"
              defaultmessage="Rejected"
            />
          </div>
        );
        break;

      case 'cancelled':
      case 'partner_cancelled':
        return (
          <div className="reservation_badge cancelled">
            <FormattedMessage
              id="reservation_card.cancelled"
              defaultmessage="Cancelled"
            />
          </div>
        );
        break;
    }
  }

  renderGuests() {
    return (
      <div>
        {`${this.props.adultGuests} `}
        { this.props.adultGuests > 1
          ? (
            <FormattedMessage
              id="card_message.adults"
              defaultMessage=" adults"
            />
          )
          : (
            <FormattedMessage
              id="card_message.adult"
              defaultMessage=" adult"
            />
          )
      }

        {`, ${this.props.childGuests} `}
        { this.props.childGuests > 1
          ? (
            <FormattedMessage
              id="card_message.childrens"
              defaultMessage=" childrens"
            />
          )
          : (
            <FormattedMessage
              id="card_message.children"
              defaultMessage=" children"
            />
          )
      }

      </div>
    );
  }


  render() {
    return (
      <div className="reservation_card">
        <Col sm="12">
          <Row>
            <div className="img_house_container">
              <img src={`${URL_STATIC}files/${this.props.img}`} alt="" className="img_house" />
            </div>
            <div className="reservation_info_container">
              <Row>
                <Col sm={6}>
                  <h5 className="name_container">
                    {this.props.name ? this.props.name : 'NO NAME'}
                  </h5>

                </Col>
                <Col sm={6}>
                  {this.renderBadge(this.props.status)}
                </Col>
              </Row>
              <Row className="reservation_card_row_info">
                <Col sm={6} className="city_container">
                  <SVG src={iconMarker} />
                  {this.props.city ? this.props.city : 'NO CITY' }
                </Col>
                <Col sm={6} className="code_container">
                  <SVG src={iconCode} />
                  <FormattedMessage
                    id="reservation_card.code"
                    defaultMessage="Code: "
                  />
                  <div className="paddingright" />
                  <div className="yellowCode">
                    { this.props.code ? this.props.code : 'LO-000000' }
                  </div>
                </Col>
              </Row>
              <Row className="reservation_card_row_info2">
                <Col sm={6} className="date_container">
                  <SVG src={iconCalendar} />
                  { this.props.startDate !== undefined ? this.props.startDate : 'No date' }

                  <SVG src={iconArrow} className="arrow_svg" />

                  { this.props.endDate !== undefined ? this.props.endDate : 'No date' }
                </Col>

                <Col sm={6} className="guests_container">
                  <SVG src={iconUser} />
                  { this.renderGuests() }
                </Col>
              </Row>
            </div>

            <div className="plus_button_container" onClick={this.toggleCard}>
              { this.state.isBottomDescriptionOpen
                ? (<SVG src={iconMinus} />)
                : (<SVG src={iconPlus} />)
              }
            </div>
          </Row>
        </Col>


        <Row>
          {this.renderBottomDescription(this.props.status)}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {
  orderUpdate
})(ReservationCard);
