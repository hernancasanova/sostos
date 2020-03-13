import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Label, Button, Popover } from 'reactstrap';
import moment from 'moment';
import 'react-dates/initialize';
import _ from 'lodash';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './style.css';
import 'tippy.js/dist/tippy.css';
import SVG from 'react-inlinesvg';
import esLocale from 'moment/locale/es';
import iconClose from '../../assets/icons/lo-icon-close.svg';
import iconArrow from '../../assets/icons/lo-icon-arrow.svg';

class MyCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 'startDate',
      shownNextDate: moment().add(1, 'months'),
      shownPrevDate: moment().subtract(1, 'months'),
      startDate: null,
      endDate: null,
      date: null,
      daySize: 100,
      isPopoverOpen: false,
      popoverWidth: '500px',
      selectedDay: null,
      editPriceTextId: 'calendar.tooltip.edit_price',
      priceCOP: null,
      priceUSD: null
    };

    moment.locale('es', esLocale);

    this.updateDimensions = this.updateDimensions.bind(this);
    this.refStartDate = React.createRef();
    this.renderDay = this.renderDay.bind(this);
    this.renderTooltip = this.renderTooltip.bind(this);
    this.handleCalendarClick = this.handleCalendarClick.bind(this);
    this.renderPrevButton = this.renderPrevButton.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.actionsPopover = React.createRef();
    this.editPrice = this.editPrice.bind(this);
    this.deletePrice = this.deletePrice.bind(this);
    this.changePriceCOP = this.changePriceCOP.bind(this);
    this.changePriceUSD = this.changePriceUSD.bind(this);
    this.changeBlock = this.changeBlock.bind(this);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    if (window.innerWidth > window.innerHeight) {
      this.setState({
        daySize: parseInt((window.innerWidth * 85) / 1336)
      });
    } else {
      this.setState({
        daySize: parseInt((window.innerHeight * 85) / 1336)
      });
    }
  }

  /* Add classes to calendar days depending on date-state */
  addDayClasses(day) {
    const configDays = [];
    const calendarArray = _.filter(this.props.dataCalendar, item => {
      let type = 'default';
      switch (item.status) {
        case 'edit-blocked':
          type = 'blocked editedPrice';
          break;
        case 'edit':
          type = 'editedPrice';
          break;
        case 'prereserved':
          type = 'pre-reserved';
          break;
        case 'reserved':
          type = 'reserved';
          break;
        case 'blocked':
          type = 'blocked';
          break;
        case 'default':
          type = 'default';
          break;
        default:
      }
      configDays.push({ day: moment.utc(item.date), class: type });
      return item;
    });

    /* const configDays = [{
      day: moment('2019-05-17'),
      class: 'editedPrice'
    }, {
      day: moment('2019-05-17'),
      class: 'reserved'
    }, {
      day: moment('2019-05-17'),
      class: 'blocked'
    }, {
      day: moment('2019-05-17'),
      class: 'pre-reserved'
    }, {
      day: moment('2019-03-17'),
      class: 'blocked editedPrice'
    }]; */
    let className = '';

    for (let i = 0; i < configDays.length; i++) {
      if (configDays[i].day.format('YYYY-MM-DD') == day.format('YYYY-MM-DD')) {
        className = configDays[i].class;
      }
    }

    return className;
  }

  handleCalendarClick(startDate, endDate) {
    if (this.state.endDate !== null) {
      if (this.state.startDate.format('MM-DD') !== startDate.format('MM-DD')) {
        this.setState({
          startDate,
          endDate: null,
          focusedInput: 'endDate',
          selectedDay: startDate.format('DDMMYYYY')
        });
      } else {
        this.setState({
          startDate: endDate,
          endDate: null,
          focusedInput: 'endDate',
          selectedDay: endDate.format('DDMMYYYY')
        });
      }
    } else {
      this.setState({
        startDate,
        endDate,
        focusedInput: 'endDate'
      });

      if (endDate !== null) {
        this.setState({ selectedDay: endDate.format('DDMMYYYY') });
      } else {
        this.setState({ selectedDay: startDate.format('DDMMYYYY') });
      }
    }
  }

  changePriceCOP(e) {
    this.setState({
      priceCOP: e.target.value
    });
  }

  changePriceUSD(e) {
    this.setState({
      priceUSD: e.target.value
    });
  }

  editPrice() {
    if (this.state.editPriceTextId == 'calendar.tooltip.edit_price') {
      this.setState({
        editPriceTextId: 'calendar.tooltip.save_price'
      });
    } else {
      this.setState({
        editPriceTextId: 'calendar.tooltip.edit_price'
      });
      const payload = {
        startDate: this.state.startDate.format('YYYY-MM-DD'),
        endDate: this.state.endDate.format('YYYY-MM-DD'),
        prices: [
          { currency: 'COP', total: this.state.priceCOP },
          { currency: 'USD', total: this.state.priceUSD }
        ],
        actionType1: 'edit-price',
        status: 'edit'
      };
      this.props.callbackNewsPrices(payload);
    }
  }

  deletePrice() {
    const payload = {
      startDate: this.state.startDate.format('YYYY-MM-DD'),
      endDate: this.state.endDate.format('YYYY-MM-DD'),
      status: 'delete'
    };
    this.props.callBackDeleteDay(payload);
  }

  openPopover() {
    this.setState({ isPopoverOpen: true });
  }

  closePopover() {
    this.setState({ isPopoverOpen: false });
  }

  changeBlock() {
    const payload = {
      startDate: this.state.startDate.format('YYYY-MM-DD'),
      endDate: this.state.endDate.format('YYYY-MM-DD'),
      status: 'blocked',
      actionType1: 'edit-price'
    };
    this.props.callBackBLockDay(payload);
  }

  renderTooltip(day) {
    const startDate = this.state.startDate.format('DDMMYYYY');
    const endDate = this.state.endDate.format('DDMMYYYY');

    const prices = _.filter(this.props.dataCalendar, item => {
      const date = moment.utc(item.date).format('DDMMYYYY');
      return date >= startDate && date <= endDate;
    });

    return (
      <div className="calendar_tooltip_1">
        <div className="calendar_upper_container">
          <Col md="12">
            <Row className="calendar_tooltip_first_row">
              <Label className="lo_bold_label">
                <FormattedMessage
                  id="calendar.tooltip.price_per_night"
                  defaultMessage="Price per night"
                />
              </Label>
            </Row>
            <Row className="calendar_tooltip_second_row">
              {this.state.editPriceTextId == 'calendar.tooltip.edit_price' && (
                <Label className="lo_calendar_price_label">
                  {prices.length > 1
                    ? 'MUCHOS PRECIOS COP'
                    : prices.length > 0
                    ? prices[0].prices
                      ? `COP $${prices[0].prices[0].total.$numberDecimal}`
                      : ' COP SIN INFORMAR'
                    : 'COP SIN INFORMAR'}
                </Label>
              )}
              {this.state.editPriceTextId == 'calendar.tooltip.save_price' && (
                <div className="editPrice-main-container">
                  <div className="currency-symbol">$</div>
                  <div className="editPrice-container">
                    <input type="text" onChange={this.changePriceCOP} />
                  </div>
                  <div className="separator">$</div>
                </div>
              )}
            </Row>
            <Row className="calendar_tooltip_second_row">
              {this.state.editPriceTextId == 'calendar.tooltip.edit_price' && (
                <Label className="lo_calendar_price_label">
                  {prices.length > 1
                    ? 'MUCHOS PRECIOS USD'
                    : prices.length > 0
                    ? prices[0].prices
                      ? `USD $${prices[0].prices[1].total.$numberDecimal}`
                      : ' USD SIN INFORMAR'
                    : 'USD SIN IFORMAR'}
                </Label>
              )}
              {this.state.editPriceTextId == 'calendar.tooltip.save_price' && (
                <div className="editPrice-main-container">
                  <div className="currency-symbol">$</div>
                  <div className="editPrice-container">
                    <input type="text" onChange={this.changePriceUSD} />
                  </div>
                  <div className="separator">$</div>
                </div>
              )}
            </Row>
            <Row className="calendar_tooltip_third_row">
              <Button className="lo_calendar_link" onClick={this.editPrice}>
                <FormattedMessage id={this.state.editPriceTextId} defaultMessage="Edit price" />
              </Button>
              {prices.length > 0 && this.state.editPriceTextId === 'calendar.tooltip.save_price' ? (
                <Button className="lo_calendar_link" onClick={this.deletePrice}>
                  <FormattedMessage id="calendar.delete_price" defaultMessage="Delete price" />
                </Button>
              ) : (
                ''
              )}
            </Row>
          </Col>
        </div>

        <div className="calendar_lower_container">
          <Col md="12">
            <Row className="calendar_tooltip_button">
              <div className="block_date_icon" />
              <Button className="lo_calendar_link_with_icon" onClick={this.changeBlock}>
                <SVG src={iconClose} className="lo_calendar_icon" />
                <FormattedMessage id="calendar.tooltip.block_date" defaultMessage="Block date" />
              </Button>
            </Row>
          </Col>
        </div>
      </div>
    );
  }

  /* Draws "Previous Month" button on calendar */
  renderPrevButton() {
    return (
      <Button
        className="calendar_prev_button"
        onClick={() =>
          this.setState(prev => ({
            shownNextDate: prev.shownNextDate.subtract(1, 'months'),
            shownPrevDate: prev.shownPrevDate.subtract(1, 'months'),
            isPopoverOpen: false
          }))
        }
      >
        <SVG src={iconArrow} className="lo_calendar_prev_icon" />
        {this.state.shownPrevDate.format('MMM YY')}
      </Button>
    );
  }

  /* Draws "Next Month" button on calendar */
  renderNextButton() {
    return (
      <Button
        className="calendar_next_button"
        onClick={() =>
          this.setState(prev => ({
            shownNextDate: prev.shownNextDate.add(1, 'months'),
            shownPrevDate: prev.shownPrevDate.add(1, 'months'),
            isPopoverOpen: false
          }))
        }
      >
        {this.state.shownNextDate.format('MMM YY')}
        <SVG src={iconArrow} className="lo_calendar_next_icon" />
      </Button>
    );
  }

  /* render days of the calendar one by one */
  renderDay(day) {
    const now = moment();
    if (this.state.startDate !== null) {
      if (
        day.diff(now) >= 0 &&
        day.format('YYYY-MM-DD') !== this.state.startDate.format('YYYY-MM-DD')
      ) {
        // Days after first date, open popover
        return (
          <div className="calendar_circle_container" onClick={e => this.openPopover(e)}>
            <div
              id={`calendar_day_${day.format('DDMMYYYY')}`}
              className={`calendar_circle ${this.addDayClasses(day)}`}
            >
              <div className="circleSubContainer">
                <div className="dayTextCalendarCircle">
                  <b>{`${day.format('DD')}`}</b>
                </div>
                <div className="editedPriceCalendarCircle">
                  <div className="editedPriceCircle" />
                </div>
              </div>
            </div>
          </div>
        );
      }
      // Days before first date, dont' popover
      return (
        <div className="calendar_circle_container" onClick={e => this.closePopover(e)}>
          <div
            id={`calendar_day_${day.format('DDMMYYYY')}`}
            className={`calendar_circle ${this.addDayClasses(day)}`}
          >
            <div className="circleSubContainer">
              <div className="dayTextCalendarCircle">
                <b>{`${day.format('DD')}`}</b>
              </div>
              <div className="editedPriceCalendarCircle">
                <div className="editedPriceCircle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    // Day without popover
    return (
      <div className="calendar_circle_container">
        <div className={`calendar_circle ${this.addDayClasses(day)}`}>
          <div className="circleSubContainer">
            <div className="dayTextCalendarCircle">
              <b>{`${day.format('DD')}`}</b>
            </div>
            <div className="editedPriceCalendarCircle">
              <div className="editedPriceCircle" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  isDayBlocked(day) {
    let blocked = false;
    const arrayCalendar = [];

    for (let i = 0; i < this.props.dataOrders.length; i++) {
      const item = this.props.dataOrders[i];
      const start = moment.utc(item.items[0].checkIn);
      const end = moment.utc(item.items[0].checkOut);
      const days = moment.duration(end.diff(start)).asDays();
      const date = start;
      for (let j = 0; j <= days; j += 1) {
        arrayCalendar.push({ date: date.format('YYYY-MM-DD') });
        date.add(1, 'days');
      }
    }
    for (let i = 0; i < arrayCalendar.length; i++) {
      if (arrayCalendar[i].date == day.format('YYYY-MM-DD')) {
        blocked = true;
      }
    }
    return blocked;
  }

  handleFocusChange(focusedInput) {
    if (focusedInput !== null) {
      this.setState({ focusedInput });
    }
  }

  render(props) {
    const popoverStyle = { width: '200px' };
    if (this.state.selectedDay && this.state.endDate) {
      const fixStyle = document.getElementById('fixStyle');
      const style =
        '.popover.show.bs-popover-bottom{' +
        'border-top-right-radius: 5px;' +
        'border-top-left-radius: 5px;' +
        'border-top: 1px solid #CCCCCC;' +
        'margin-top: 10px;}';

      fixStyle.innerHTML = `<style>${style}</style>`;
    }

    return (
      <React.Fragment>
        <DateRangePicker
          startDate={this.state.startDate}
          startDateId="your_unique_start_date_id"
          endDate={this.state.endDate}
          endDateId="your_unique_end_date_id"
          onDatesChange={({ startDate, endDate }) => this.handleCalendarClick(startDate, endDate)}
          focusedInput={this.state.focusedInput}
          orientation="horizontal"
          daySize={this.state.daySize}
          minimumNights={0}
          numberOfMonths={1}
          hideKeyboardShortcutsPanel
          renderDayContents={day => this.renderDay(day)}
          navPrev={this.renderPrevButton()}
          navNext={this.renderNextButton()}
          isDayBlocked={day => this.isDayBlocked(day)}
        />

        {this.state.selectedDay && this.state.endDate && (
          <Popover
            id={`actionsPopover_${this.state.selectedDay}`}
            style={popoverStyle}
            ref={this.actionsPopover}
            placement="top"
            isOpen
            toggle={e => this.openPopover(e)}
            target={`calendar_day_${this.state.selectedDay}`}
          >
            <div>{this.renderTooltip()}</div>
          </Popover>
        )}
      </React.Fragment>
    );
  }
}

export default MyCalendar;
