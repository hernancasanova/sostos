import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import { Col, Row, Button, FormFeedback } from 'reactstrap';
import { Select } from '../../form';
import './style.css';

import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Checkbox from '../../form/Checkbox';
import CarIcon from '../../../assets/icons/lo-icon-car.svg';
import SearchPeople from '../../PopUpSearchPeople/SearchPeople';
import { roomShow, orderCreate } from '../../../actions/index';

const options = [
  {
    id: 'COP',
    name: 'COP',
    value: 'COP'
  },
  {
    id: 'USD',
    name: 'USD',
    value: 'USD'
  }
];

class ReserverTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
      childGuests: null,
      adultGuests: null,
      currency: 'COP',
      price: '0.000.000',
      termsAndConditionsChecked: null
    };

    this.reserveRoom = this.reserveRoom.bind(this);
    this.searchPeopleCallback = this.searchPeopleCallback.bind(this);
    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
  }

  componentWillMount() {
    if (!this.props.user) {
      this.props.history.push('/');
    } else {
      this.props.roomShow(this.props.roomId);
    }
  }

  componentDidUpdate() {
    if (this.state.price === '0.000.000') {
      if (this.props.room.prices.length > 1) {
        if (this.props.room.prices[0].total !== null && this.props.room.prices[0].total !== 0) {
          this.setState({
            price: this.props.room.prices[0].total.$numberDecimal,
            currency: 'COP'
          });
        }
      }
    }
  }

  changeCurrency(e) {
    this.setState({
      currency: e.target.value,
      price: this.props.room.prices[e.target.value === 'COP' ? 0 : 1].total.$numberDecimal
    });
  }

  reserveRoom() {
    if (
      this.state.termsAndConditionsChecked === null ||
      this.state.termsAndConditionsChecked === false
    ) {
      this.setState({ termsAndConditionsChecked: false });
      if (this.state.endDate === null || this.state.endDate === false) {
        this.setState({ endDate: false });
      }
      if (this.state.adultGuests === null && this.state.childGuests === null) {
        this.setState({ adultGuests: false, childGuests: false });
      }
    } else if (this.state.endDate === null || this.state.endDate === false) {
      this.setState({ endDate: false });
    } else {
      const params = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        adultGuests: this.state.childGuests,
        childGuests: this.state.adultGuests,
        currency: this.state.currency,
        userId: this.props.user._id,
        prices: [
          {
            net: this.props.room.prices[0].total.$numberDecimal,
            total: this.props.room.prices[0].total.$numberDecimal,
            currency: 'COP',
            discount: '0.0',
            tax: '0.0'
          },
          {
            net: this.props.room.prices[1].total.$numberDecimal,
            total: this.props.room.prices[1].total.$numberDecimal,
            currency: 'USD',
            discount: '0.0',
            tax: '0.0'
          }
        ],
        pricePerNight: this.state.price,
        totalPrice: this.state.price * this.state.endDate.diff(this.state.startDate, 'days')
      };

      if (this.props.onReserve) this.props.onReserve(params);
    }
  }

  searchPeopleCallback(params) {
    this.setState({
      adultGuests: params.adult + params.children,
      childGuests: params.baby
    });
  }

  numberWithCommas(x) {
    const sub = x.substr(0, x.indexOf('.'));
    const sub2 = x.substr(x.indexOf('.') + 1, x.length);
    if (sub2 !== null && sub2 !== '' && sub !== null && sub !== '') {
      return `${sub.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${sub2}`;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  changeTermAndConditions(e) {
    this.setState({ termsAndConditionsChecked: e });
  }
  isDayBlocked(day) {
    let blocked = false;
    for (let i = 0; i < this.props.blockDays.length; i++) {
      if (moment(this.props.blockDays[i].date).format('YYYY-MM-DD') == day.format('YYYY-MM-DD')) {
        blocked = true;
      }
    }
    return blocked;
  }

  render() {
    const lang = this.props.lang;
    return (
      <React.Fragment>
        <Row className="container-reserver">
          <Row className="row-size center-flex-reserver">
            <Col sm="12">
              <h2 className="center-flex-reserver text-margin-0">
                <b>$ {this.numberWithCommas(this.state.price)}</b>
              </h2>
            </Col>
          </Row>
          <Row className="row-size center-flex-reserver">
            <Col xs="6" className="price-type price-in">
              Precio en
            </Col>
            <Col xs="6" className="price-type currency">
              <Select
                id="select_currency_detail"
                defaultMessageLabel="Currency"
                options={options}
                className="currency_select"
                value={this.state.currency}
                onChange={e => this.changeCurrency(e)}
              />
            </Col>
          </Row>
          <Row className="separator-row" />
          <Row className="row-size margin-top-reserver">
            <Col sm="6" xs="6" className="check-date-text-in">
              Check in
            </Col>
            <Col sm="6" xs="6" className="check-date-text-out">
              Check out
            </Col>
            <Col sm="12" className="dp-container">
              <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                hideKeyboardShortcutsPanel
                isDayBlocked={day => this.isDayBlocked(day)}
              />
            </Col>
          </Row>

          {this.state.endDate === false && (
            <Row className="endDate_validator">
              <Col sm="12">
                <FormFeedback>
                  <FormattedMessage
                    id="validators.ticket_reserver.checkin_checkout"
                    defaultMessage="You have to select a reservation period."
                  />
                </FormFeedback>
              </Col>
            </Row>
          )}

          <Row className="row-size margin-top-reserver hostages-text">
            <Col sm="6" xs="6" className="reserver-hostages-text">
              Huéspedes
            </Col>
          </Row>
          <Row className="row-size margin-top-reserver people_detail">
            <Col className="center-flex-reserver">
              <SearchPeople id="people_detail_room" onChange={e => this.searchPeopleCallback(e)} />
            </Col>
          </Row>

          {this.state.adultGuests === false && this.state.childGuests === false && (
            <Row className="adultGuests_validator">
              <Col sm="12">
                <FormFeedback>
                  <FormattedMessage
                    id="validators.ticket_reserver.guests"
                    defaultMessage="You have to select a reservation period."
                  />
                </FormFeedback>
              </Col>
            </Row>
          )}

          <Row className="row-size margin-top-reserver services_included">
            <FormattedMessage
              id="reserver.services_included"
              defaultMessage="Your reservation includes this service for free: "
            />
          </Row>
          <Row className="row-size margin-top-reserver services_included_description">
            <Col sm="4" xs="4" className="align-car-left">
              <SVG src={CarIcon} />
            </Col>
            <Col sm="8" xs="8" className="align-text-car-right">
              <h6>
                <FormattedMessage
                  id="reserver.free_airport_travel"
                  defaultMessage="Transportation from the airport to the lodging"
                />
              </h6>
            </Col>
          </Row>
          <Row className="row-size margin-top-reserver">
            <Col className="center-flex-reserver term_and_conditions">
              <Checkbox
                className="padding-botton-check"
                onChange={e => this.changeTermAndConditions(e)}
              />
              <div className={`term_and_conditions_container ${lang}`}>
                <FormattedMessage id="reserver.i_agreed_to" defaultMessage="I agreed to" />
                <button className="reserver_lo_link">
                  <FormattedMessage
                    id="reserver.term_and_conditions"
                    defaultMessage="terms and conditions."
                  />
                </button>
              </div>
            </Col>
          </Row>

          {this.state.termsAndConditionsChecked === false && (
            <Row>
              <Col sm="12">
                <FormFeedback>
                  <FormattedMessage
                    id="validators.ticket_reserver.term_and_conditions"
                    defaultMessage="You should accept the terms and conditions to continue"
                  />
                </FormFeedback>
              </Col>
            </Row>
          )}

          <Row className="row-size margin-top-reserver">
            <Button className="lo_button fullwidth " onClick={this.reserveRoom}>
              <FormattedMessage id="reserver.reserve" defaultMessage="Reserve" />
            </Button>
          </Row>

          <Row className="row-size margin-top-reserver booking_is_free">
            <Col sm="12">
              <FormattedMessage id="reserver.booking_is_free" defaultMessage="I agreed to" />
            </Col>
          </Row>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.locale.lang,
  user: state.auth.user,
  room: state.roomForm,
  order: state.order
});

export default connect(
  mapStateToProps,
  { roomShow }
)(ReserverTicket);
