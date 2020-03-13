import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Button, Col, Row, Label
} from 'reactstrap';
import {
  Input, DateComboPicker, Steps, BackButton, Select
} from '../..';
import './style.css';
import selects from '../../../../translations/selects.js';


class AddHalls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = selects[this.props.lang].fiveOrMoreWithNull;
    return (
      <div className="addHall">
        <h5>
          <FormattedMessage
            id="room_form.title"
            defaultMessage="room"
          />
          {` ${this.props.roomIndex + 1}`}
        </h5>

        <Row className="room_form_sofas_section">
          <Col md="6" className="addHallForm">
            <Label className="lo_bold_label">
              <FormattedMessage
                id="room_form.have_sofa"
                defaultMessage="Has this room bathrooms?"
              />
            </Label>
            <Row className="hallInfoForm">
              <div className="fix_yes_no_cbox">
                <Input
                  type="boolean-checkbox"
                  value={this.props.isAvailableBeds}
                  onChange={e => this.props.onChangeIsAvailableBeds(e, this.props.roomIndex)}
                />
              </div>
            </Row>
          </Col>
          <Col md="4" hidden={!this.props.isAvailableBeds}>
            <Label className="lo_bold_label">
              <FormattedMessage
                id="room_form.number_of_sofas"
                defaultMessage="Quantity"
              />
            </Label>
            <Row className="hallInfoForm2">
              <Col>
                <Select
                  id={`add_hall_bed_qty_${this.props.roomIndex}`}
                  options={options}
                  value={this.props.bedsQuantity}
                  onChange={e => this.props.onChangeBedsQuantity(e, this.props.roomIndex)}
                />

              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="AddHallsBathsRow">
          <Col md="6" className="addBathForm">
            <Label className="lo_bold_label">
              <FormattedMessage
                id="room_form.have_bath"
                defaultMessage="Has this room bathrooms?"
              />
            </Label>
            <Row className="bathInfoForm">
              <div className="fix_yes_no_cbox">
                <Input
                  type="boolean-checkbox"
                  value={this.props.isAvailableBathRooms}
                  onChange={e => this.props.onChangeIsAvailableBathRooms(e, this.props.roomIndex)}
                />
              </div>
            </Row>
          </Col>
          <Col md="4" hidden={!this.props.isAvailableBathRooms}>
            <Label className="lo_bold_label">
              <FormattedMessage
                id="room_form.number_of_baths"
                defaultMessage="Quantity"
              />
            </Label>
            <Row className="bathInfoForm2">
              <Col>
                <Select
                  id={`add_hall_${this.props.roomIndex}`}
                  options={options}
                  value={this.props.bathRoomsQuantity}
                  onChange={e => this.props.onChangeBathRoomsQuantity(e, this.props.roomIndex)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default AddHalls;
