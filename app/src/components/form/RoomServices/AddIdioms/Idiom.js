import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import { Card, CardBody, CardImg, Row, Button, Col } from 'reactstrap';
import Select from '../../Select';
import options from '../../../../translations/selects.js';

import iconClose from '../../../../assets/icons/lo-icon-trash.svg';

class Idiom extends Component {
  constructor(props) {
    super(props);
    this.deleteIdiom = this.deleteIdiom.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
  }

  deleteIdiom(event) {
    if (this.props.callbackDelete !== undefined) {
      this.props.callbackDelete(this.props.id);
    }
  }
  changeEvent(e) {
    this.props.onChangeEvent(this.props.id, e.target.value);
  }

  render(props) {
    const lang = this.props.lang;

    return (
      <Col md="6" className="event-wrapper">
        <Col md="10" className="event-wrapper">
          <Select
            lang={lang}
            options={options[lang].languages}
            id={`select_event__${this.props.id}`}
            value={this.props.value ? this.props.value : ''}
            onChange={this.changeEvent}
          />
        </Col>
        <Col md="2">
          <div className="event-delete-button-container" onClick={this.deleteIdiom}>
            <SVG className="dynamic-delete-button" src={iconClose} />
          </div>
        </Col>
      </Col>
    );
  }
}

export default Idiom;
