import React, { Component } from 'react';
import AddBedrooms from './AddBedrooms';
import AddHalls from './AddHalls';
import './style.css';
import { FormattedMessage } from 'react-intl';
import { Button, Col, Row, Label } from 'reactstrap';

import {
  Input, DateComboPicker, Steps, BackButton, Select
} from '..';

const optionsBedTypes = [{
    id: 'null',
    name: 'Selecciona',
    value: null
  }, {
    id: '1',
    name: 'Queen',
    value: 'queen'
  }, {
    id: '2',
    name: 'King',
    value: 'king'
}];

class RoomDistribution extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    for (let i = 0; i < this.props.numberOfBedRooms; i++) {
      this.props.rooms.push(
        <AddBedrooms 
          roomIndex={i + 1} 
        />
      );
    }

    const halls = [];
    for (let i = 0; i < this.props.numberOfLivingRooms; i++) {
      halls.push(
        <AddHalls 
          key={i}
          roomIndex={ this.props.halls[i]._id ? this.props.halls[i]._id : i }
          isAvailableBeds={this.props.halls[i].isAvailableBeds}
          bedsQuantity={this.props.halls[i].bedsQuantity}
          isAvailableBathRooms={this.props.halls[i].isAvailableBathRooms}
          bathRoomsQuantity={this.props.halls[i].bathRoomsQuantity}
          options={this.props.optionsLivingRooms}
          onChangeIsAvailableBathRooms={this.props.onChangeIsAvailableBathRooms.bind(this)}
        />
      );
    }

    return (
      <React.Fragment>
        <div className="row roomsConfig">
          <Col md="4">
            <Label className="lo_bold_label room-distribution-label">

              <FormattedMessage
                id="new_room_2.number_of_bedrooms"
                defaultMessage="Number of bedrooms"
              />
            </Label>


            <Select
              onChange={this.props.onChangeBedRooms}
              defaultValue="Selecciona"
              lang={this.props.lang}
              options={this.props.optionsBedRooms}
              value={this.props.numberOfBedRooms ? this.props.numberOfBedRooms : '' }
              onChange={ e => console.debug(e)}
            />

          </Col>
          <Col md="4">
            <Label className="lo_bold_label room-distribution-label">
              <FormattedMessage
                id="new_room_2.number_of_rooms"
                defaultMessage="Number of rooms"
              />
            </Label>
            <Select
              defaultValue="Selecciona"
              onChange={this.props.onChangeLivingRooms}
              lang={this.props.lang}
              options={this.props.optionsLivingRooms}
              value={this.props.numberOfLivingRooms ? this.props.numberOfLivingRooms : '' }
            />
          </Col>
        </div>

        <div className="room_distribution beds_section">
          <Row className="new_room_2_beds_label">
            <Col md="8">
              <h5>
                <FormattedMessage
                  id="new_room_2.beds"
                  defaultMessage="Beds"
                />
              </h5>
            </Col>
          </Row>
          <p className="lo_p beds_text">
            <FormattedMessage
              id="new_room_2.beds_text"
              defaultMessage="Indicate only bed's bedroom"
            />
          </p>
        </div>
        { 'this.props.rooms' }
        { halls }
      </React.Fragment>
    );
  }
}
export default RoomDistribution;
