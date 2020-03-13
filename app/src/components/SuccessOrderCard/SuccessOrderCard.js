import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'reactstrap';
import './styles.css';
import moment from 'moment';
import esLocale from 'moment/locale/es';
import { orderShow } from '../../actions/index';
import { URL_STATIC } from '../../configs/configs';

class SuccessOrderCard extends Component {
  constructor(props) {
    super(props);
    moment.locale('es', esLocale);
    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.goToPayment = this.goToPayment.bind(this);
    this.renderPrice = this.renderPrice.bind(this);
  }

  componentDidUpdate() {}

  goToPayment() {
    console.log('GO TO PAYMENT PLATFORM');
    this.props.history.push('/success');
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  renderCityCountryName(city, country) {
    let res = city;
    if (city.length + country.length + 2 < 50) {
      res += `, ${country}`;
    }
    return res;
  }

  renderGuests() {
    return (
      <div>
        {`${this.props.adultGuests} `}
        {this.props.adultGuests > 1 ? (
          <FormattedMessage id="success_card.adults" defaultMessage=" adults" />
        ) : (
          <FormattedMessage id="success_card.adult" defaultMessage=" adult" />
        )}

        {`, ${this.props.childGuests} `}
        {this.props.childGuests > 1 ? (
          <FormattedMessage id="success_card.childrens" defaultMessage=" childrens" />
        ) : (
          <FormattedMessage id="success_card.children" defaultMessage=" children" />
        )}
      </div>
    );
  }

  render() {
    const lang = this.props.lang;
    return (
      <Col className="success_order_card_container">
        <Row>
          <Col sm="12" className="success_order_col8_container">
            <Row className="img-info-container">
              <Col sm="3" className="success_order_img_container">
                <img src={`${URL_STATIC}files/${this.props.img}`} className="success_order_img" />
              </Col>

              <Col sm="9" className="success_order_info_container">
                <Row>
                  <h4 className="card_title">{this.props.name}</h4>
                  <div className="card_subtitle">
                    {this.renderCityCountryName(this.props.city, this.props.country)}
                  </div>
                </Row>
                <Col sm="7" className="order-description-container">
                  <Row className="success_order_info_first_row">
                    <Col sm="5" className="infolabel">
                      Check in:{' '}
                    </Col>
                    <Col sm="7" className="infovalue">
                      {moment(this.props.checkIn)
                        .locale(this.props.lang)
                        .format('LL')}
                    </Col>
                  </Row>
                  <Row className="success_order_info_second_row">
                    <Col sm="5" className="infolabel">
                      Check out:
                    </Col>
                    <Col sm="7" className="infovalue">
                      {moment(this.props.checkOut)
                        .locale(this.props.lang)
                        .format('LL')}
                    </Col>
                  </Row>
                  <Row className="success_order_info_third_row">
                    <Col sm="5" className="infolabel">
                      <FormattedMessage id="success_card.guests" defaultMessage="Guests:" />
                    </Col>
                    <Col sm="7" className="infovalue">
                      {this.renderGuests()}
                    </Col>
                  </Row>
                </Col>
                <Col sm="5" className="price-options-container">
                  <Row>
                    <h4>
                      $ {this.renderPrice()}{' '}
                      {this.props.totalPrice !== undefined
                        ? this.numberWithCommas(this.props.totalPrice)
                        : 'NaN'}
                    </h4>
                    <div className="price_subtitle">
                      <FormattedMessage id="success_card.price_in" defaultMessage="Price in" />
                      {` ${this.props.currency}`}
                    </div>
                  </Row>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
  auth: state.auth,
  user: state.user,
  lang: state.locale.lang,
  loading: state.order.loading
});

export default connect(
  mapStateToProps,
  {
    orderShow
  }
)(SuccessOrderCard);
