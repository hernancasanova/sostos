import React, { Component } from 'react';
import { Col, Row, Label } from 'reactstrap';
import moment from 'moment';
import labels from '../../../translations/form/labels';
import dates from '../../../translations/dates';
import Select from '../Select';
import './style.css';

/**
 * Set the options for days select based on year and month selected
 * Set the options for years select based on minYear and MaxYear
 */
const setOptions = (minYear, maxYear, lang, selectedYear, selectedMonth) => {
  /* Setting Years */
  const optionsYears = [];
  for (let i = minYear; i < maxYear; i++) {
    optionsYears.push({ id: `dp_year${i}`, value: i, name: i });
  }

  /* Setting Months */
  const months = dates[lang];
  const optionsMonths = [];
  for (let i = 0; i < months.length; i++) {
    optionsMonths.push({ id: `dp_month${i}`, value: i, name: months[i].name });
  }

  /* Check Leap Year */
  let leap = false;
  if (selectedYear) {
    leap = selectedYear % 4 === 0;
  } else {
    leap = minYear % 4 === 0;
  }

  /* Get month days */
  let days = 31;
  if (months[selectedMonth]) {
    days = months[selectedMonth].days;
  }

  const optionsDays = [];
  for (let i = 1; i <= days; i++) {
    optionsDays.push({ id: `dp_day${i}`, value: i, name: i });
  }
  /* Add day to Feb in leap year */
  if (leap && selectedMonth === 1) {
    optionsDays.push({
      id: `dp_day${29}`,
      value: 29,
      name: 29
    });
  }

  const options = {
    years: optionsYears,
    months: optionsMonths,
    days: optionsDays
  };

  return options;
};

export default class DateComboPicker extends Component {
  constructor(props) {
    super(props);
    /* Set initial state */
    this.state = {
      options: setOptions(props.minYear, props.maxYear, props.lang, null, null)
    };

    this.refDay = React.createRef();
    this.refMonth = React.createRef();
    this.refYear = React.createRef();
  }

  /* Fix date and return in Date() format */
  getFormattedDate(date) {
    let fixedMonth = parseInt(date.month, 10) + 1;
    if (fixedMonth < 10) {
      fixedMonth = `0${fixedMonth}`;
    }
    let fixedDay = parseInt(date.day, 10);
    if (fixedDay < 10) {
      fixedDay = `0${fixedDay}`;
    }

    const strDate = `${date.year}-${fixedMonth}-${fixedDay}`;
    const formatted = moment(strDate);
    return formatted;
  }

  /* years select onChange handler */
  yearChange(event) {
    const date = {
      year: event.target.value,
      month: this.refMonth.current.props.value,
      day: this.refDay.current.props.value
    };

    this.props.callback(this.getFormattedDate(date));
  }

  /* months select onChange handler */
  monthChange(event) {
    const date = {
      year: this.refYear.current.props.value,
      month: event.target.value,
      day: this.refDay.current.props.value
    };

    this.props.callback(this.getFormattedDate(date));
  }

  /* days select onChange handler */
  dayChange(event) {
    const date = {
      year: this.refYear.current.props.value,
      month: this.refMonth.current.props.value,
      day: event.target.value
    };

    this.props.callback(this.getFormattedDate(date));
  }

  /* If props.FormattedLabelId, draw it */
  renderLabel(props) {
    const lang =
      localStorage.getItem('livingover.lang') !== null
        ? localStorage.getItem('livingover.lang')
        : 'es'; /* Default Language */

    if (props.FormattedLabelId) {
      let label = '...';
      if (props.FormattedLabelId) {
        label = labels[lang][props.FormattedLabelId];
      }
      return (
        <Row>
          <Col xs="12">
            <Label htmlFor={props.id} className="lo_bold_label">
              {label}
            </Label>
          </Col>
        </Row>
      );
    }
  }

  render() {
    let day;
    let month;
    let year = null;
    if (this.props.value) {
      const str = moment(this.props.value).format('YYYY-MM-DD');
      year = str.substr(0, 4);
      month = str.substr(5, 2);
      month = parseInt(month) - 1;
      day = str.substr(8, 2);
      day = parseInt(day);
    }

    return (
      <div>
        {this.renderLabel(this.props)}

        <Row>
          <Col xs="6">
            <Select
              id="dcp_month"
              options={this.state.options.months}
              onChange={e => this.monthChange(e)}
              callback={this.props.callback}
              value={month || 0}
              ref={this.refMonth}
            />
          </Col>
          <Col xs="3" className="dcp_days">
            <Select
              id="dcp_days"
              options={this.state.options.days}
              onChange={e => this.dayChange(e)}
              callback={this.props.callback}
              value={day || 1}
              ref={this.refDay}
            />
          </Col>
          <Col xs="3" className="dcp_years">
            <Select
              id="dcp_year"
              options={this.state.options.years}
              onChange={e => this.yearChange(e)}
              callback={this.props.callback}
              value={year || this.state.options.years[0].value}
              ref={this.refYear}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
