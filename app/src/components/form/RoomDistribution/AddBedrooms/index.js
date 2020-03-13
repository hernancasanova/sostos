import _ from 'lodash';
import React, { Component } from 'react';
import './style.css';

import { FormattedMessage } from 'react-intl';

import {

  Button, Col, Row, Label, FormFeedback
} from 'reactstrap';
import Bed from './bed';

import {
  Input, DateComboPicker, Steps, BackButton, Select
} from '../..';
import selects from
  '../../../../translations/selects.js';

class AddBedrooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beds: this.props.beds ? this.props.beds : [],
      baths: true
    };
    this.addBed = this.addBed.bind(this);
  }

  addBed() {
    const beds = this.state.beds;
    beds.push(<Bed key={`bed-${beds.length}`} />);
    this.setState({ beds });
  }

  onChangeBedHandler(e, index) {
    const beds = this.state.beds;
    beds[index] = e;
    this.setState({ beds });

    if (this.props.onChangeBeds !== undefined) {
      const index = this.props.roomIndex;
      this.props.onChangeBeds({ beds, index });
    }
  }

  renderBeds() {
    const beds      = [];
    const errors    = this.props.errors;
    const roomIndex = this.props.roomIndex;
    _.map(this.state.beds, (data, index) => {
      beds.push(
        <Bed
          id={`bed_${this.props.id}_${index}`}
          key={`key_bed_${this.props.id}_${index}`}
          data={data}
          onChange={e => this.onChangeBedHandler(e, index)}
          lang={this.props.lang}
          errors={errors}
          bedIndex={index}
          roomIndex={roomIndex}
        />
      );
    });
    return beds;
  }

  render() {

    const capacityIndex = (['bedRooms', this.props.roomIndex, 'peopleCapacity'].join('_'));
    const bathIndex     = (['bedRooms', this.props.roomIndex, 'bathsQuantity'].join('_'));

    return (
      <div className="addBedroom">
        <h5>
          <FormattedMessage
            id="bedroom_form.title"
            defaultMessage="Bedroom"
          />
          {` ${this.props.roomIndex + 1}`}
        </h5>
        <Row className="add_bedroom_bet_type_label">
          <Col md="12">
            <Label className="lo_bold_label">
              <FormattedMessage
                id="bedroom_form.bed_type"
                defaultMessage="What kind of beds are there in the room?"
              />
            </Label>
          </Col>
        </Row>
        {this.renderBeds()}
        <Row>
          <Col md="12" onClick={this.addBed} className="addBed">
            <div className="addBedButton">
              <div className="addBedButtonContent"> + </div>
            </div>
            <div className=" addBedText">
              <FormattedMessage
                id="bedroom_form.add_bed"
                defaultMessage="add another bed"
              />
            </div>
          </Col>
        </Row>


        <Row className="row_people_capacity">
          <Col md="12" className="bedroom_form_people_capacity_label">
            <Label className="lo_bold_label">
              <FormattedMessage
                id="bedroom_form.people_capacity"
                defaultMessage="How many people can sleep in this room?"
              />
            </Label>
          </Col>
        </Row>
        <Row className="row_bedroom_capacity">
          <Col md="8">
            <Select
              id={`bedroom_capacity_selector${this.props.id}`}
              options={selects[this.props.lang].oneToTen}
              onChange={e => this.props.onChangePeopleCapacity(parseInt(e.target.value), this.props.roomIndex)}
              value={this.props.peopleCapacity}
            />
          </Col>
        </Row>
        {this.props.errors[capacityIndex] !== undefined
        && (
        <Row>
          <Col>
            <FormFeedback>
              <FormattedMessage
                id={`validators.${this.props.errors[capacityIndex].field}.${this.props.errors[capacityIndex].type}`}
                defaultMessage={this.props.errors[capacityIndex].feedback}
              />
            </FormFeedback>
          </Col>
        </Row>
        )
        }

        <Row className="bathInfo">
          <Col md="6" className="fixed_bath_info">
            <Label className="lo_bold_label">
              <FormattedMessage
                id="bedroom_form.have_bathroom"
                defaultMessage="Has this room bathrooms?"
              />
            </Label>
            <Row className="bathInfoForm">
              <div className="fix_yes_no_cbox">
                <Input
                  type="boolean-checkbox"
                  value={this.props.isAvailableBath}
                  onChange={e => this.props.onChangeIsAvailableBath(e, this.props.roomIndex)}
                  value={this.props.isAvailableBath}
                />
              </div>
            </Row>
          </Col>
          <Col md="6" hidden={!this.props.isAvailableBath}>
            <Label className="lo_bold_label">
              <FormattedMessage
                id="bedroom_form.number_of_bathrooms"
                defaultMessage="How  many baths are in this room?"
              />
            </Label>
            <Row className="bathInfoForm2">
              <Col>
                <Select
                  id={`bath_info_${this.props.id}`}
                  disabled={!this.state.baths}
                  options={selects[this.props.lang].oneToTen}
                  onChange={e => this.props.onChangeBathsQuantity(parseInt(e.target.value), this.props.roomIndex)}
                  value={this.props.bathsQuantity}
                  // className="custom-select custom-select-lg mb-3 custom-select-many-baths lo_bold_label"
                />

              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.errors[bathIndex] !== undefined
        && (
        <Row>
          <Col md="6" />
          <Col md="6">
            <FormFeedback>
              <FormattedMessage
                id={`validators.${this.props.errors[bathIndex].field}.${this.props.errors[bathIndex].type}`}
                defaultMessage={this.props.errors[bathIndex].feedback}
              />
            </FormFeedback>
          </Col>
        </Row>
        )
        }
      </div>
    );
  }
}
export default AddBedrooms;
